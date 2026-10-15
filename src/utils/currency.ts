/**
 * Regresa una cantidad en formato de moneda (MXN)
 * @param amount Number | string
 * @returns String (formato: $XXX,XXX,XXX.00)
 */
export function formatCurrency(amount: Number | string): string {
    let numberAmount = [];
    numberAmount = amount.toString().split('.');

    if(numberAmount.length > 0) {
        if (numberAmount[0].length >= 3) {
            numberAmount[0] = numberAmount[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        if (numberAmount[1] && numberAmount[1].length >= 5) {
            numberAmount[1] = numberAmount[1].replace(/(\d{3})/g, '$1 ');
        }
    }
    return numberAmount.join('.');
}