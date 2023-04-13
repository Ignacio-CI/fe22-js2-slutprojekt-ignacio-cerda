const colorPalette = () => {
    const palette = ["#bee9e8","#62b6cb","#1b4965","#cae9ff","#5fa8d3"];
    const randomIndex = Math.floor(Math.random() * palette.length);
    return palette[randomIndex]
}

const isInstanceOfError = (error: unknown): error is Error => {
    return error instanceof Error;
  };

export { colorPalette, isInstanceOfError }