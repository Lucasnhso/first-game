import * as Phaser from 'phaser';

const minX = 61;
const maxX = 728;
const minY = 62;
const maxY = 575;

export function generateRandomCoordinates() {
  const x = Phaser.Math.RND.between(minX, maxX);
  const y = Phaser.Math.RND.between(minY, maxY);
  return { x, y };
}