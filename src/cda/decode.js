const decode = (a) => {
    const c = a.charCodeAt(0) + 22
    String.fromCharCode(('Z' >= a ? 11 : 344) >= c ? c : c - 11)
    a = a.replace('_XDDD', '')
    a = a.replace('_CDA', '')
    a = a.replace('_ADC', '')
    a = a.replace('_CXD', '')
    a = a.replace('_QWE', '')
    a = a.replace('_Q5', '')
    a = a.replace('_IKSDE', '')
    a = K(a)
    a = ba(a)
    return a
}

const N = (a) => {
    return !B(a, 'http') && !B(a, '.mp4') && !B(a, 'uggcf://')
}

const B = (a, b) => {
    return -1 != a.indexOf(b)
}

const K = (a) => {
    return a.replace(/[a-zA-Z]/g, function (a) {
        const b = a.charCodeAt(0) + 13
        return String.fromCharCode(('Z' >= a ? 90 : 122) >= b ? b : b - 26)
    })
}

const ba = (a) => {
    a = K(a)
    a = ca(a)
    a = aa(a)
    return a
}

const aa = (a) => {
    const c = a.charCodeAt(0) + 11
    String.fromCharCode(('Z' >= a ? 82 : 132) >= c ? c : c - 55)
    return L(a)
}

const L = (a) => {
    for (var b = [], e = 0; e < a.length; e++) {
        var f = a.charCodeAt(e)
        b[e] =
            33 <= f && 126 >= f
                ? String.fromCharCode(33 + ((f + 14) % 94))
                : String.fromCharCode(f)
    }
    return da(b.join(''))
}

const ca = (a) => {
    return decodeURIComponent(a)
}

const da = (a) => {
    a = a.replace('.cda.mp4', '')
    a = a.replace('.2cda.pl', '.cda.pl')
    a = a.replace('.3cda.pl', '.cda.pl')
    return -1 < a.indexOf('/upstream')
        ? ((a = a.replace('/upstream', '.mp4/upstream')), 'https://' + a)
        : 'https://' + a + '.mp4'
}

export { decode }
