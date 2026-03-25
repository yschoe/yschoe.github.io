(function () {
  'use strict';

  const ASSETS = window.SHACKY_ASSETS;
  if (!ASSETS) {
    throw new Error('Missing SHACKY_ASSETS. Did assets.js load?');
  }

  const SCREEN_W = 720;
  const SCREEN_H = 348;
  const TILE = 50;
  const VIEW_W = 11;
  const VIEW_H = 5;
  const VIEW_ORIGIN_X = 30;
  const VIEW_ORIGIN_Y = 20;
  const PLAYER_VIEW_X = 5;
  const PLAYER_VIEW_Y = 2;

  const MOVE_COOLDOWN_MS = 110;
  const ACTION_COOLDOWN_MS = 70;
  const WORLD_TICK_MS = 240;
  const MAX_HP_LOSS_PER_WORLD_TICK = 1;
  const SPAWN_COOLDOWN_MS = 1200;
  const SPAWN_WAVE_CHANCE = 0.45;
  const SPAWN_PER_TYPE_CHANCE = 0.55;
  const INPUT_BUFFER_MAX = 3;
  const HOLD_MOVE_INITIAL_DELAY_MS = 220;
  const HOLD_MOVE_REPEAT_MS = 120;

  const HP_UPRATE = 50;
  const EXP_RATE = 24;
  const MAX_BAR = 480;

  const COLOR = {
    white: '#f0f0f0',
    black: '#000000',
    lite: '#ffffff',
    dark: '#111111',
    red: '#ff0000',
  };

  const SPRITE_FILES = {
    player_r: 'prince.fon',
    player_l: 'pr2.fon',
    player_u: 'pru.fon',
    player_d: 'prd.fon',
    princess: 'princess.fon',
    skeleton: 'skeleton.fon',
    fox: 'fox.fon',
    bat: 'bat.fon',
    slime: 'slime.fon',
    mount: 'mount.fon',
    tree: 'tree.fon',
    water: 'water.fon',
    blank: 'blank.fon',
    anya: 'anya.fon',
    choco: 'choco.fon',
    tomb: 'tomb.fon',
    shoem: 'shoem.fon',
    cave: 'cave.fon',
    vend: 'vend.fon',
    house: 'house.fon',
    shswd: 'shswd.fon',
    lgswd: 'lgswd.fon',
    saber: 'saber.fon',
    anhome: 'anhome.fon',
    shoes: 'shoes.fon',
    wall: 'wall.fon',
    gem: 'gem.fon',
    caveend: 'caveend.fon',
    smash: 'smash.fon',
    heart: 'heart.fon',
    smack: 'smack.fon',
  };

  const TILE_TO_SPRITE = {
    '0': 'blank',
    '1': 'tree',
    '2': 'mount',
    '3': 'water',
    'f': 'fox',
    's': 'skeleton',
    'b': 'bat',
    'S': 'slime',
    'c': 'cave',
    'C': 'caveend',
    'h': 'house',
    'v': 'vend',
    'w': 'wall',
    'A': 'anhome',
  };

  const MESSAGES = {
    0: [
      'The old grave watch man says:',
      'Please save us from the fire-breath dragon.',
      'Go to wizardess Anya for help.',
      'Before you go you must..zzz.',
      'He fell asleep before he gave you the clue!',
    ],
    1: ['Look! You discovered something.', 'You see it is a chocolate.', 'You put it in your pocket.', 'YUMMY'],
    2: ['Anya: I know you\'ve come to ask help.', 'But I won\'t speak until you bring me chocolate.', 'Come back with one.'],
    3: ['Anya: Ah! Good!', 'Take this jewel and buy magic shoes.', 'Use them to get into the cave.', 'Good luck!'],
    4: ['Shoe merchant: You need Anya\'s jewel.', 'Come back when you have it.'],
    5: ['Shoe merchant: You\'ve got the jewel.', 'Here are winged shoes.', 'Beware of creatures in the cave.'],
    6: ['Princess: Well, you\'re here at last.', 'In the cave, find ULTIMARR and the way to DARR.', 'End of stage 1.'],
  };

  const MSG_PORTRAIT = {
    0: 'tomb',
    1: 'choco',
    2: 'anya',
    3: 'anya',
    4: 'shoem',
    5: 'shoem',
    6: 'princess',
  };

  const MSG_SONG = {
    0: 'tomb.sd',
    1: 'stin.sd',
    2: 'anya.sd',
    3: 'anya.sd',
    4: 'stin.sd',
    5: 'stin.sd',
    6: 'sayo2.sd',
  };

  function randChoice(arr) {
    return arr[(Math.random() * arr.length) | 0];
  }

  class InputBuffer {
    constructor(maxLen = INPUT_BUFFER_MAX) {
      this.maxLen = maxLen;
      this.queue = [];
      this.lastKey = '';
      this.lastTs = 0;
    }

    push(action, nowMs) {
      if (action === this.lastKey && nowMs - this.lastTs < 90) {
        return;
      }
      if (action.startsWith('move_')) {
        for (let i = this.queue.length - 1; i >= 0; i -= 1) {
          if (this.queue[i].startsWith('move_')) {
            this.queue.splice(i, 1);
            break;
          }
        }
      }
      this.queue.push(action);
      if (this.queue.length > this.maxLen) {
        this.queue.splice(0, this.queue.length - this.maxLen);
      }
      this.lastKey = action;
      this.lastTs = nowMs;
    }

    pop() {
      if (!this.queue.length) return null;
      return this.queue.shift();
    }
  }

  class SDMusicPlayer {
    constructor(sdMap) {
      this.sdMap = sdMap;
      this.audioCtx = null;
      this.song = null;
      this.songIdx = 0;
      this.songEndAt = 0;
      this.loop = false;
    }

    ensureAudio() {
      if (!this.audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) this.audioCtx = new Ctx();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
    }

    parseSong(name) {
      const lines = this.sdMap[name.toLowerCase()] || [];
      const events = [];
      for (const raw of lines) {
        const parts = raw.trim().split(/\s+/);
        if (!parts[0]) continue;
        const marker = parts[0].toUpperCase();
        if (marker === 'E') break;
        if (parts.length < 3) continue;
        const hz = Math.max(0, parseInt(parts[1], 10) || 0);
        const ms = Math.max(0, parseInt(parts[2], 10) || 0);
        events.push({ sound: marker === 'S', hz, ms });
      }
      return events;
    }

    playSong(name, loop = false) {
      this.ensureAudio();
      const events = this.parseSong(name);
      if (!events.length) return;
      this.song = events;
      this.songIdx = 0;
      this.songEndAt = 0;
      this.loop = loop;
    }

    playTone(hz, ms) {
      if (!this.audioCtx || hz <= 0 || ms <= 0) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.value = hz;
      gain.gain.value = 0.1;
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      const now = this.audioCtx.currentTime;
      osc.start(now);
      osc.stop(now + ms / 1000);
    }

    playPattern(pattern) {
      this.ensureAudio();
      if (!this.audioCtx || !pattern || !pattern.length) return;
      let t = this.audioCtx.currentTime;
      for (const step of pattern) {
        const hz = step.hz || 0;
        const ms = Math.max(0, step.ms || 0);
        const gainValue = typeof step.gain === 'number' ? step.gain : 0.1;
        if (hz > 0 && ms > 0) {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'square';
          osc.frequency.value = hz;
          gain.gain.value = gainValue;
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(t);
          osc.stop(t + ms / 1000);
        }
        t += ms / 1000;
      }
    }

    update(nowMs) {
      if (!this.song) return;
      if (nowMs < this.songEndAt) return;
      if (this.songIdx >= this.song.length) {
        if (this.loop) this.songIdx = 0;
        else {
          this.song = null;
          return;
        }
      }
      const ev = this.song[this.songIdx++];
      this.songEndAt = nowMs + ev.ms;
      if (ev.sound) this.playTone(ev.hz, ev.ms);
    }
  }

  class ShackyWebGame {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');

      this.state = 'splash'; // splash -> characters -> play -> map/end
      this.sprites = this.buildSprites();
      this.map = this.loadMap();
      this.mapH = this.map.length;
      this.mapW = this.map[0].length;

      this.playerX = Math.min(15, this.mapW - 1);
      this.playerY = Math.min(40, this.mapH - 1);
      this.playerFacing = 'r';

      this.hp = 400;
      this.exp = 0;
      this.killed = 0;
      this.chocoNum = 0;
      this.shoesNum = 0;
      this.gemNum = 0;
      this.mesNum = 0;

      this.monsters = [];
      this.breakGame = false;
      this.victory = false;

      this.input = new InputBuffer(INPUT_BUFFER_MAX);
      this.pendingAttack = false;
      this.lastMoveMs = 0;
      this.lastActionMs = 0;
      this.lastWorldTickMs = 0;
      this.lastSpawnMs = 0;
      this.heldMoveAction = null;
      this.nextHeldMoveMs = 0;
      this.messageLines = [];
      this.lastMessageMusicKey = '';

      this.music = new SDMusicPlayer(ASSETS.SD || {});
      this.specialPositions = this.findSpecialPositions();
      this.placePlayerOnWalkableTile();

      this.bindKeys();
    }

    buildSprites() {
      const sprites = {};
      for (const [key, file] of Object.entries(SPRITE_FILES)) {
        const lines = (ASSETS.FON[file.toLowerCase()] || ASSETS.FON['blank.fon'] || []);
        sprites[key] = this.makeFonCanvas(lines);
      }
      return sprites;
    }

    makeFonCanvas(lines) {
      const c = document.createElement('canvas');
      c.width = 50;
      c.height = 50;
      const g = c.getContext('2d');
      g.fillStyle = COLOR.black;
      g.fillRect(0, 0, 50, 50);
      g.fillStyle = COLOR.white;
      for (let y = 0; y < Math.min(50, lines.length); y += 1) {
        const row = lines[y] || '';
        for (let x = 0; x < Math.min(50, row.length); x += 1) {
          if (row[x] === '1') g.fillRect(x, y, 1, 1);
        }
      }
      return c;
    }

    loadMap() {
      const src = (ASSETS.MAP2 || []).map((s) => s.trimEnd()).filter((s) => s.length > 0);
      if (!src.length) {
        return Array.from({ length: 50 }, () => Array.from({ length: 110 }, () => '0'));
      }
      const w = Math.max(...src.map((s) => s.length));
      return src.map((s) => s.padEnd(w, '0').split(''));
    }

    wrap(x, y) {
      let xx = x % this.mapW;
      let yy = y % this.mapH;
      if (xx < 0) xx += this.mapW;
      if (yy < 0) yy += this.mapH;
      return [xx, yy];
    }

    tile(x, y) {
      const [xx, yy] = this.wrap(x, y);
      return this.map[yy][xx];
    }

    setTile(x, y, v) {
      const [xx, yy] = this.wrap(x, y);
      this.map[yy][xx] = v;
    }

    levelFor(who) {
      return ({ f: 1, s: 2, b: 3, S: 4 })[who] || 1;
    }

    canStepOn(ch) {
      return ['0', 'C', 'h', 'c', 'A', 'v', 's'].includes(ch) || (ch === '3' && this.shoesNum === 1);
    }

    placePlayerOnWalkableTile() {
      if (this.canStepOn(this.tile(this.playerX, this.playerY))) return;
      const maxR = Math.max(this.mapW, this.mapH);
      for (let r = 1; r < maxR; r += 1) {
        for (let dy = -r; dy <= r; dy += 1) {
          for (let dx = -r; dx <= r; dx += 1) {
            const [tx, ty] = this.wrap(this.playerX + dx, this.playerY + dy);
            if (this.canStepOn(this.tile(tx, ty))) {
              this.playerX = tx;
              this.playerY = ty;
              return;
            }
          }
        }
      }
    }

    findSpecialPositions() {
      const found = {};
      const wanted = new Set(['c', 'h', 'A', 'v', 'C']);
      for (let y = 0; y < this.mapH; y += 1) {
        for (let x = 0; x < this.mapW; x += 1) {
          const ch = this.map[y][x];
          if (wanted.has(ch) && !(ch in found)) {
            found[ch] = [x, y];
          }
        }
      }
      return found;
    }

    bindKeys() {
      window.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
          e.preventDefault();
        }
        const now = performance.now();
        this.music.ensureAudio();

        if (this.state === 'splash') {
          this.state = 'characters';
          return;
        }
        if (this.state === 'characters') {
          this.state = 'play';
          this.checkMessage();
          return;
        }
        if (this.state === 'map') {
          this.state = 'play';
          return;
        }
        if (this.state === 'end') {
          this.breakGame = true;
          return;
        }

        if (e.key === 'Escape') {
          this.toEnd(false);
          return;
        }

        const key = e.key;
        if (this.pendingAttack) {
          const atk = this.attackDirectionAction(key);
          this.pendingAttack = false;
          if (atk) this.input.push(atk, now);
          return;
        }

        const action = this.keyToAction(key);
        if (action) {
          this.input.push(action, now);
          if (action.startsWith('move_')) {
            this.heldMoveAction = action;
            this.nextHeldMoveMs = now + HOLD_MOVE_INITIAL_DELAY_MS;
          }
        }
      });

      window.addEventListener('keyup', (e) => {
        if (this.state !== 'play') return;
        const action = this.keyToAction(e.key);
        if (action && action.startsWith('move_') && this.heldMoveAction === action) {
          this.heldMoveAction = null;
        }
      });

      this.canvas.addEventListener('mousedown', () => {
        this.music.ensureAudio();
      });
    }

    keyToAction(key) {
      const map = {
        ArrowUp: 'move_u',
        ArrowLeft: 'move_l',
        ArrowRight: 'move_r',
        ArrowDown: 'move_d',
        '8': 'move_u',
        '4': 'move_l',
        '6': 'move_r',
        '2': 'move_d',
        m: 'view_map',
        M: 'view_map',
        ' ': 'attack_mode',
        a: 'attack_mode',
        A: 'attack_mode',
      };
      return map[key] || null;
    }

    attackDirectionAction(key) {
      const map = {
        ArrowUp: 'atk_n',
        ArrowLeft: 'atk_w',
        ArrowDown: 'atk_s',
        ArrowRight: 'atk_e',
        '8': 'atk_n',
        '4': 'atk_w',
        '2': 'atk_s',
        '6': 'atk_e',
      };
      return map[key] || null;
    }

    update(nowMs) {
      this.music.update(nowMs);
      if (this.breakGame) return;
      if (this.state !== 'play') return;

      let hadAction = false;
      if (!this.pendingAttack && this.heldMoveAction && nowMs >= this.nextHeldMoveMs) {
        this.input.push(this.heldMoveAction, nowMs);
        this.nextHeldMoveMs = nowMs + HOLD_MOVE_REPEAT_MS;
      }
      const action = this.input.pop();
      if (action) {
        hadAction = this.processAction(action, nowMs);
      }

      if (!hadAction && nowMs - this.lastWorldTickMs >= WORLD_TICK_MS) {
        this.updateWorldWhenIdle();
        this.lastWorldTickMs = nowMs;
      }
    }

    processAction(action, nowMs) {
      if (action.startsWith('move_') && nowMs - this.lastMoveMs < MOVE_COOLDOWN_MS) return false;
      if (action.startsWith('atk_') && nowMs - this.lastActionMs < ACTION_COOLDOWN_MS) return false;

      if (action === 'move_u') {
        if (this.tryMove(0, -1, 'u')) this.playMoveSfx();
        this.lastMoveMs = nowMs;
      } else if (action === 'move_l') {
        if (this.tryMove(-1, 0, 'l')) this.playMoveSfx();
        this.lastMoveMs = nowMs;
      } else if (action === 'move_r') {
        if (this.tryMove(1, 0, 'r')) this.playMoveSfx();
        this.lastMoveMs = nowMs;
      } else if (action === 'move_d') {
        if (this.tryMove(0, 1, 'd')) this.playMoveSfx();
        this.lastMoveMs = nowMs;
      } else if (action === 'attack_mode') {
        this.pendingAttack = true;
      } else if (action === 'atk_n') {
        this.playerFacing = 'u';
        this.playAttackSfx();
        this.attack('n');
        this.lastActionMs = nowMs;
      } else if (action === 'atk_w') {
        this.playerFacing = 'l';
        this.playAttackSfx();
        this.attack('w');
        this.lastActionMs = nowMs;
      } else if (action === 'atk_s') {
        this.playerFacing = 'd';
        this.playAttackSfx();
        this.attack('s');
        this.lastActionMs = nowMs;
      } else if (action === 'atk_e') {
        this.playerFacing = 'r';
        this.playAttackSfx();
        this.attack('e');
        this.lastActionMs = nowMs;
      } else if (action === 'view_map') {
        this.state = 'map';
      } else {
        return false;
      }

      this.checkMessage();
      this.cullOffscreenMonsters();
      return true;
    }

    tryMove(dx, dy, facing) {
      const [tx, ty] = this.wrap(this.playerX + dx, this.playerY + dy);
      this.playerFacing = facing;
      if (this.canStepOn(this.tile(tx, ty))) {
        this.playerX = tx;
        this.playerY = ty;
        return true;
      }
      return false;
    }

    playMoveSfx() {
      this.music.playPattern([{ hz: 340, ms: 50, gain: 0.05 }]);
    }

    playAttackSfx() {
      const pattern = [];
      for (let i = 0; i < 3; i += 1) {
        pattern.push({ hz: 600, ms: 12 }, { hz: 500, ms: 12 });
      }
      this.music.playPattern(pattern);
    }

    updateExp() {
      this.exp = this.killed * EXP_RATE;
      if (this.exp > MAX_BAR - EXP_RATE) {
        this.exp = 0;
        this.killed = 0;
        this.hp = Math.min(MAX_BAR, this.hp + HP_UPRATE);
      }
    }

    attack(dir) {
      const d = { n: [0, -1], s: [0, 1], w: [-1, 0], e: [1, 0] }[dir];
      const [tx, ty] = this.wrap(this.playerX + d[0], this.playerY + d[1]);
      const idx = this.monsters.findIndex((m) => m.x === tx && m.y === ty);
      if (idx < 0) return;
      this.monsters[idx].hits -= 1;
      if (this.monsters[idx].hits <= 0) {
        const dead = this.monsters.splice(idx, 1)[0];
        this.setTile(dead.x, dead.y, '0');
        this.killed += 1;
      }
      this.updateExp();
    }

    notNear() {
      if (!this.monsters.length) return true;
      for (const m of this.monsters) {
        const d = Math.abs(m.x - this.playerX) + Math.abs(m.y - this.playerY);
        if (d <= 13) return false;
      }
      return true;
    }

    monsterRegionOk(who, x, y) {
      const rightWaterBand = x >= Math.floor(this.mapW * 0.58) && y >= 6 && y <= Math.floor(this.mapH * 0.72);
      const northMountains = y <= Math.floor(this.mapH * 0.38);
      const westForest = x <= Math.floor(this.mapW * 0.4);
      const deepEast = x >= Math.floor(this.mapW * 0.62) && y >= Math.floor(this.mapH * 0.45);

      if (who === 'f') return westForest || !northMountains;
      if (who === 's') return northMountains;
      if (who === 'b') return rightWaterBand;
      if (who === 'S') return deepEast;
      return true;
    }

    appearMonster(who) {
      for (let i = 0; i < 10; i += 1) {
        const choice = (Math.random() * 4) | 0;
        let tx;
        let ty;
        if (choice === 0) {
          tx = this.playerX - 1;
          ty = this.playerY + ((Math.random() * 4) | 0);
        } else if (choice === 1) {
          tx = this.playerX + ((Math.random() * 10) | 0);
          ty = this.playerY - 1;
        } else if (choice === 2) {
          tx = this.playerX + 10;
          ty = this.playerY + ((Math.random() * 4) | 0);
        } else {
          tx = this.playerX + ((Math.random() * 10) | 0);
          ty = this.playerY + 4;
        }
        [tx, ty] = this.wrap(tx, ty);
        if (this.tile(tx, ty) === '0' && this.monsterRegionOk(who, tx, ty)) {
          this.monsters.push({ who, x: tx, y: ty, hits: this.levelFor(who) });
          this.setTile(tx, ty, who);
          return;
        }
      }
    }

    spawnMonsters(nowMs) {
      if (this.monsters.length >= 100) return;
      if (this.monsters.length >= 6 && !this.notNear()) return;
      if (nowMs - this.lastSpawnMs < SPAWN_COOLDOWN_MS) return;
      if (Math.random() > SPAWN_WAVE_CHANCE) {
        this.lastSpawnMs = nowMs;
        return;
      }
      for (const who of ['f', 's', 'b', 'S']) {
        if (Math.random() < SPAWN_PER_TYPE_CHANCE) this.appearMonster(who);
      }
      this.lastSpawnMs = nowMs;
    }

    moveMonsters() {
      for (const m of this.monsters) {
        const dx = (this.playerX > m.x) - (this.playerX < m.x);
        const dy = (this.playerY > m.y) - (this.playerY < m.y);

        const chase = this.wrap(m.x + dx, m.y + dy);
        const horiz = this.wrap(m.x + dx, m.y);
        const vert = this.wrap(m.x, m.y + dy);
        const sidesteps = [this.wrap(m.x + 1, m.y), this.wrap(m.x - 1, m.y), this.wrap(m.x, m.y + 1), this.wrap(m.x, m.y - 1)];

        const candidates = [chase, horiz, vert];
        if (Math.random() < 0.45) {
          candidates.sort(() => Math.random() - 0.5);
        } else {
          sidesteps.sort(() => Math.random() - 0.5);
          candidates.push(sidesteps[0], sidesteps[1]);
        }

        let moved = false;
        for (const [nx, ny] of candidates) {
          if (nx === this.playerX && ny === this.playerY) continue;
          if (this.tile(nx, ny) === '0') {
            this.setTile(m.x, m.y, '0');
            m.x = nx;
            m.y = ny;
            this.setTile(m.x, m.y, m.who);
            moved = true;
            break;
          }
        }

        if (!moved) {
          sidesteps.sort(() => Math.random() - 0.5);
          for (const [nx, ny] of sidesteps) {
            if (nx === this.playerX && ny === this.playerY) continue;
            if (this.tile(nx, ny) === '0') {
              this.setTile(m.x, m.y, '0');
              m.x = nx;
              m.y = ny;
              this.setTile(m.x, m.y, m.who);
              break;
            }
          }
        }
      }
    }

    visibleWorldPositions() {
      const s = new Set();
      for (let vy = 0; vy < VIEW_H; vy += 1) {
        for (let vx = 0; vx < VIEW_W; vx += 1) {
          const [wx, wy] = this.wrap(this.playerX + vx - PLAYER_VIEW_X, this.playerY + vy - PLAYER_VIEW_Y);
          s.add(`${wx},${wy}`);
        }
      }
      return s;
    }

    cullOffscreenMonsters() {
      const visible = this.visibleWorldPositions();
      const kept = [];
      for (const m of this.monsters) {
        if (visible.has(`${m.x},${m.y}`)) {
          kept.push(m);
        } else {
          this.setTile(m.x, m.y, '0');
        }
      }
      this.monsters = kept;
    }

    monsterAttack() {
      let damage = 0;
      for (const m of this.monsters) {
        if (Math.abs(m.x - this.playerX) <= 1 && Math.abs(m.y - this.playerY) <= 1) damage += 1;
      }
      if (damage > 0) {
        this.hp -= Math.min(damage, MAX_HP_LOSS_PER_WORLD_TICK);
        if (this.hp <= 0) this.toEnd(false);
      }
    }

    updateWorldWhenIdle() {
      const now = performance.now();
      this.spawnMonsters(now);
      this.moveMonsters();
      this.cullOffscreenMonsters();
      this.monsterAttack();
    }

    playMessageMusic(mesNum, posKey) {
      const key = `${mesNum}@${posKey}`;
      if (this.lastMessageMusicKey === key) return;
      this.lastMessageMusicKey = key;
      const song = MSG_SONG[mesNum];
      if (song) this.music.playSong(song, false);
    }

    checkMessage() {
      this.messageLines = [];
      let any = false;
      const pos = [this.playerX, this.playerY];

      const cave = this.specialPositions.c;
      const tomb = this.specialPositions.h;
      const goddess = this.specialPositions.A;
      const shoemaker = this.specialPositions.v;
      const caveEnd = this.specialPositions.C;

      const same = (p) => p && p[0] === pos[0] && p[1] === pos[1];

      if (same(cave)) {
        this.mesNum = 1;
        this.chocoNum = 1;
        any = true;
      } else if (same(tomb)) {
        this.mesNum = 0;
        any = true;
      } else if (same(goddess)) {
        any = true;
        if (this.chocoNum === 0) this.mesNum = 2;
        else {
          this.mesNum = 3;
          this.gemNum = 1;
        }
      } else if (same(shoemaker)) {
        any = true;
        if (this.gemNum === 1) {
          this.mesNum = 5;
          this.shoesNum = 1;
        } else {
          this.mesNum = 4;
        }
      } else if (same(caveEnd)) {
        any = true;
        this.mesNum = 6;
      }

      if (any) {
        this.messageLines = MESSAGES[this.mesNum] || [];
        this.playMessageMusic(this.mesNum, `${pos[0]},${pos[1]}`);
        if (this.mesNum === 6) this.toEnd(true);
      }
    }

    toEnd(victory) {
      this.victory = !!victory;
      this.state = 'end';
      this.breakGame = true;
    }

    wrapTextPx(text, maxPx) {
      const words = text.split(/\s+/).filter(Boolean);
      if (!words.length) return [''];
      const lines = [];
      let current = words[0];
      for (let i = 1; i < words.length; i += 1) {
        const candidate = `${current} ${words[i]}`;
        if (this.ctx.measureText(candidate).width <= maxPx) current = candidate;
        else {
          lines.push(current);
          current = words[i];
        }
      }
      lines.push(current);
      return lines;
    }

    drawRect(x, y, w, h, stroke = COLOR.white, fill = null) {
      const c = this.ctx;
      if (fill) {
        c.fillStyle = fill;
        c.fillRect(x, y, w, h);
      }
      c.strokeStyle = stroke;
      c.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
    }

    drawFrame() {
      const c = this.ctx;
      c.fillStyle = COLOR.black;
      c.fillRect(0, 0, SCREEN_W, SCREEN_H);
      this.drawRect(0, 0, SCREEN_W, SCREEN_H);
      this.drawRect(29, 19, 551, 251);
      this.drawRect(100, 280, 481, 20);
      this.drawRect(100, 310, 481, 20);
      this.drawRect(590, 70, 120, 200);
      this.drawRect(589, 279, 52, 52);
      this.drawRect(654, 279, 52, 52);

      c.fillStyle = COLOR.white;
      c.font = '16px monospace';
      c.fillText('H.P.', 30, 295);
      c.fillText('EXP.', 30, 325);
      c.fillText('MESSAGES', 604, 84);
      c.fillText('WEAPON', 592, 278);
      c.fillText('ITEMS', 660, 278);
      c.font = 'bold 26px monospace';
      c.fillText('Shacky Tale', 598, 26);
    }

    drawBars() {
      const hpLen = Math.max(0, Math.min(MAX_BAR, this.hp));
      const expLen = Math.max(0, Math.min(MAX_BAR, this.exp));
      this.ctx.fillStyle = COLOR.white;
      if (hpLen > 0) this.ctx.fillRect(101, 281, hpLen, 18);
      if (expLen > 0) this.ctx.fillRect(101, 311, expLen, 18);
    }

    drawInventory() {
      const weapon = this.gemNum ? 'lgswd' : 'shswd';
      this.ctx.drawImage(this.sprites[weapon], 590, 280);
      if (this.shoesNum) this.ctx.drawImage(this.sprites.shoes, 655, 280);
      else if (this.gemNum) this.ctx.drawImage(this.sprites.gem, 655, 280);
      else if (this.chocoNum) this.ctx.drawImage(this.sprites.choco, 655, 280);
    }

    drawMapWindow() {
      for (let vy = 0; vy < VIEW_H; vy += 1) {
        for (let vx = 0; vx < VIEW_W; vx += 1) {
          const wx = this.playerX + vx - PLAYER_VIEW_X;
          const wy = this.playerY + vy - PLAYER_VIEW_Y;
          const ch = this.tile(wx, wy);
          const sprite = this.sprites[TILE_TO_SPRITE[ch] || 'blank'];
          const px = VIEW_ORIGIN_X + vx * TILE;
          const py = VIEW_ORIGIN_Y + vy * TILE;
          if (vx !== PLAYER_VIEW_X || vy !== PLAYER_VIEW_Y) {
            this.ctx.drawImage(sprite, px, py);
          }
        }
      }

      const pSprite = { r: 'player_r', l: 'player_l', u: 'player_u', d: 'player_d' }[this.playerFacing];
      this.ctx.drawImage(this.sprites[pSprite], VIEW_ORIGIN_X + PLAYER_VIEW_X * TILE, VIEW_ORIGIN_Y + PLAYER_VIEW_Y * TILE);
    }

    drawMessageBox() {
      const c = this.ctx;
      c.fillStyle = COLOR.black;
      c.fillRect(591, 71, 118, 198);
      c.fillStyle = COLOR.white;
      c.font = '16px monospace';
      c.fillText('MESSAGES', 604, 84);

      const pKey = MSG_PORTRAIT[this.mesNum];
      if (this.messageLines.length && pKey && this.sprites[pKey]) {
        c.drawImage(this.sprites[pKey], 600, 100);
      }

      c.font = '11px monospace';
      const wrapped = [];
      for (const line of this.messageLines) {
        wrapped.push(...this.wrapTextPx(line, 112));
      }
      let y = 156;
      for (let i = 0; i < Math.min(8, wrapped.length); i += 1) {
        c.fillText(wrapped[i], 595, y);
        y += 13;
      }
    }

    drawPlay() {
      this.drawFrame();
      this.drawMapWindow();
      this.drawBars();
      this.drawInventory();
      this.drawMessageBox();
      this.ctx.fillStyle = COLOR.white;
      this.ctx.font = '16px monospace';
      this.ctx.fillText(`(${this.playerX + 1},${this.playerY + 1})`, 590, 44);
      if (this.pendingAttack) this.ctx.fillText('Attack: choose dir', 593, 252);
    }

    drawSplash() {
      const c = this.ctx;
      c.fillStyle = COLOR.white;
      c.fillRect(0, 0, SCREEN_W, SCREEN_H);
      c.strokeStyle = COLOR.black;
      c.strokeRect(40.5, 15.5, 560, 76);
      c.fillStyle = COLOR.black;
      c.font = 'bold 34px monospace';
      c.fillText('Shacky Tale', 180, 64);
      c.drawImage(this.sprites.princess, 190, 170);
      c.drawImage(this.sprites.player_l, 320, 170);
      c.drawImage(this.sprites.heart, 255, 120);
      c.font = '16px monospace';
      c.fillText('PATIENCE! Loading characters...', 160, 302);
      c.fillText('Press any key to continue', 210, 324);
    }

    drawCharacters() {
      const c = this.ctx;
      c.fillStyle = COLOR.white;
      c.fillRect(0, 0, SCREEN_W, SCREEN_H);
      c.strokeStyle = COLOR.black;
      c.strokeRect(35.5, 30.5, 630, 50);
      c.fillStyle = COLOR.black;
      c.font = 'bold 30px monospace';
      c.fillText('Characters', 245, 63);
      c.font = '16px monospace';

      c.drawImage(this.sprites.princess, 90, 90);
      c.fillText('princess', 155, 120);
      c.drawImage(this.sprites.player_l, 300, 90);
      c.fillText('shacky', 365, 120);

      c.fillText('MONSTERS', 90, 170);
      c.drawImage(this.sprites.skeleton, 90, 190);
      c.drawImage(this.sprites.fox, 145, 190);
      c.drawImage(this.sprites.bat, 200, 190);
      c.drawImage(this.sprites.slime, 255, 190);

      c.fillText('OTHERS', 90, 265);
      c.drawImage(this.sprites.anya, 90, 285);
      c.drawImage(this.sprites.tomb, 145, 285);
      c.drawImage(this.sprites.shoem, 200, 285);
      c.fillText('Press any key to start game', 350, 302);
      c.fillText('To attack press [a] and direction', 350, 322);
      c.fillText('For map, press [m]', 350, 342);
    }

    drawMapView() {
      const c = this.ctx;
      c.fillStyle = COLOR.white;
      c.fillRect(0, 0, SCREEN_W, SCREEN_H);

      const viewW = 550;
      const viewH = 250;
      const scale = Math.max(1, Math.min((viewW / this.mapW) | 0, (viewH / this.mapH) | 0));
      const miniW = this.mapW * scale;
      const miniH = this.mapH * scale;
      const ox = 30 + ((viewW - miniW) >> 1);
      const oy = 20 + ((viewH - miniH) >> 1);

      for (let y = 0; y < this.mapH; y += 1) {
        for (let x = 0; x < this.mapW; x += 1) {
          const ch = this.map[y][x];
          if (ch === '0') continue;
          c.fillStyle = COLOR.black;
          c.fillRect(ox + x * scale, oy + y * scale, scale, scale);
        }
      }
      c.fillStyle = COLOR.red;
      c.fillRect(ox + this.playerX * scale, oy + this.playerY * scale, scale, scale);
      c.strokeStyle = COLOR.red;
      c.strokeRect(ox + this.playerX * scale + 0.5, oy + this.playerY * scale + 0.5, Math.max(1, scale - 1), Math.max(1, scale - 1));

      c.fillStyle = COLOR.white;
      c.font = '16px monospace';
      c.fillText('MAP VIEW - press any key', 590, 92);
    }

    drawEnd() {
      const c = this.ctx;
      c.fillStyle = COLOR.black;
      c.fillRect(0, 0, SCREEN_W, SCREEN_H);
      c.fillStyle = COLOR.white;
      c.font = 'bold 30px monospace';
      if (this.victory) c.fillText('CONGRATULATIONS!', 190, 96);
      else if (this.hp <= 0) c.fillText('YOU ARE DEAD!', 225, 96);
      else c.fillText('GAME OVER', 250, 96);

      c.font = '18px monospace';
      const lines = this.victory
        ? ['Thank you....', 'smack! smack!', 'End of Stage 1']
        : this.hp <= 0
          ? ['Rest in peace.', 'May God bless you.']
          : ['Session ended.'];
      let y = 150;
      for (const line of lines) {
        c.fillText(line, 220, y);
        y += 26;
      }
      c.fillText('Press any key to quit', 210, 300);
    }

    render() {
      if (this.state === 'splash') this.drawSplash();
      else if (this.state === 'characters') this.drawCharacters();
      else if (this.state === 'map') this.drawMapView();
      else if (this.state === 'end') this.drawEnd();
      else this.drawPlay();
    }

    run() {
      const loop = (ts) => {
        this.update(ts);
        this.render();
        if (!this.breakGame || this.state === 'end') {
          requestAnimationFrame(loop);
        }
      };
      requestAnimationFrame(loop);
    }
  }

  const canvas = document.getElementById('game');
  const game = new ShackyWebGame(canvas);
  game.run();
})();
