class CharGrid {
  public chars: String[][]

  constructor(x: number, y: number) {
    this.chars = new Array(x).fill(new Array(y).fill(this.getRandChar()))
  }

  private getRandChar() {
    const chars = 'abcdefghijklmnopqrstuvwxyz'
    return chars[Math.floor(Math.random() * chars.length)]
  }

  public update(x: number, y: number) {
    this.chars[x][y] = this.getRandChar()
  }
}

const grid = new CharGrid(10, 10)

export default grid