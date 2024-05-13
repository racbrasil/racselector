function interpolizer(x, x0, x1, y0, y1) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}

const tCondInterpolize1 = interpolizer(32.5, 30, 35, 4.38, 4.72);
const tCondInterpolize2 = interpolizer(32.5, 30, 35, 4.73, 5.00);

const teste = interpolizer(7.5, 10, 5, tCondInterpolize1, tCondInterpolize2)

console.log(teste)