import { Container, Graphics, Text } from 'pixi.js';

export class AvatarView extends Container {
  constructor(color: number, name: string) {
    super();
    const shadow = new Graphics().ellipse(0, 0, 14, 7).fill({ color: 0x000000, alpha: 0.3 });
    const body = new Graphics().roundRect(-8, -30, 16, 28, 3).fill(color);
    const head = new Graphics().circle(0, -38, 8).fill(0xffd9b3);

    const label = new Text({
      text: name,
      style: { fontSize: 12, fill: 0xffffff, stroke: { color: 0x000000, width: 3 } },
    });
    label.anchor.set(0.5, 1);
    label.position.set(0, -50);

    this.addChild(shadow, body, head, label);
  }
}