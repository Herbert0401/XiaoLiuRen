import test from 'node:test';
import assert from 'node:assert/strict';
import { branchFromHour, buildReading, calculatePalaces } from '../src/liuren.js';

test('maps clock hours to traditional two-hour branches', () => {
  assert.equal(branchFromHour(23).name, '子');
  assert.equal(branchFromHour(0).name, '子');
  assert.equal(branchFromHour(1).name, '丑');
  assert.equal(branchFromHour(22).name, '亥');
});

test('starts first lunar month, first day, zi hour at da an', () => {
  const result = calculatePalaces({
    lunarMonth: 1,
    lunarDay: 1,
    branchNumber: 1
  });

  assert.equal(result.month.name, '大安');
  assert.equal(result.day.name, '大安');
  assert.equal(result.hour.name, '大安');
});

test('counts month, day, and hour through the six palaces', () => {
  const result = calculatePalaces({
    lunarMonth: 4,
    lunarDay: 17,
    branchNumber: 7
  });

  assert.equal(result.month.name, '赤口');
  assert.equal(result.day.name, '留连');
  assert.equal(result.hour.name, '留连');
});

test('builds a manual reading with topic advice and relation', () => {
  const reading = buildReading({
    mode: 'lunar',
    lunarMonth: '4',
    lunarDay: '17',
    hourBranch: '午',
    topic: 'career',
    question: '项目能不能推进'
  });

  assert.equal(reading.final.name, '留连');
  assert.equal(reading.topic.label, '事业');
  assert.match(reading.codexReading.topic, /流程|审批|材料/);
  assert.equal(reading.input.question, '项目能不能推进');
});
