import * as Phaser from 'phaser';

const minX = 61;
const maxX = 728;
const minY = 62;
const maxY = 575;

export function generateRandomCoordinates(blackListX?: number, blackListY?: number) {
  const minDistance = 50;
  const x = Phaser.Math.RND.between(minX, maxX);
  const y = Phaser.Math.RND.between(minY, maxY);

  // Verifica se as coordenadas estão dentro da área proibida
  if (
    x >= blackListX - minDistance && x <= blackListX + minDistance &&
    y >= blackListY - minDistance && y <= blackListY + minDistance
  ) {
    // Se estiver dentro da área proibida, chama a função novamente
    return generateRandomCoordinates(blackListX, blackListY);
  }


  return { x, y };
}