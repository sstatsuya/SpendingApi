const timeStampToText = (mode = 'day', timestamp) => {
    const month = new Date(timestamp).getMonth() + 1
    console.log(mode)
    console.log(month)
    switch (mode) {
        case 'day':
            break;
        case 'month':
            switch (month) {
                case 1:
                    return `January ${new Date(timestamp).getFullYear()}`
                case 2:
                    return `February ${new Date(timestamp).getFullYear()}`
                case 3:
                    return `March ${new Date(timestamp).getFullYear()}`
                case 4:
                    return `April ${new Date(timestamp).getFullYear()}`
                case 5:
                    return `May ${new Date(timestamp).getFullYear()}`
                case 6:
                    return `June ${new Date(timestamp).getFullYear()}`
                case 7:
                    return `July ${new Date(timestamp).getFullYear()}`
                case 8:
                    return `August ${new Date(timestamp).getFullYear()}`
                case 9:
                    return `September ${new Date(timestamp).getFullYear()}`
                case 10:
                    return `October ${new Date(timestamp).getFullYear()}`
                case 11:
                    return `November ${new Date(timestamp).getFullYear()}`
                case 12:
                    return `December ${new Date(timestamp).getFullYear()}`
                default:
                    return 'Unknown time'
            }
        default:
            return 'Unknown time'
    }
}

module.exports = {
    timeStampToText
}