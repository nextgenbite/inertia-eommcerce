
export function formatCurrency(amount, config = null) {
    // Default fallback config if none is passed
    const defaultConfig = {
        currency_symbol: '$',
    };

    const cfg = config || defaultConfig;

    return `${cfg.currency_symbol}${Math.round(amount)}`;
}
