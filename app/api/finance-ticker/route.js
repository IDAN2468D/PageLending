import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const symbols = [
            { id: 'ILS=X', label: 'דולר/שקל' },
            { id: 'EURILS=X', label: 'אירו/שקל' },
            { id: 'TA35.TA', label: 'ת״א 35' },
            { id: '^GSPC', label: 'S&P 500' },
            { id: '^IXIC', label: 'NASDAQ' },
            { id: 'BTC-USD', label: 'ביטקוין ($)' },
            { id: 'GC=F', label: 'זהב ($)' },
        ];

        // Fetch each symbol individually to bypass 401 on the quotes endpoint
        const fetchPromises = symbols.map(async (s) => {
            try {
                const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${s.id}?interval=1d`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                        'Accept': 'application/json'
                    },
                    cache: 'no-store'
                });
                if (!res.ok) return null;
                const data = await res.json();

                const meta = data.chart?.result?.[0]?.meta;
                if (!meta) return null;

                const price = meta.regularMarketPrice;
                const previousClose = meta.chartPreviousClose || meta.previousClose;

                let changePercent = 0;
                if (previousClose && previousClose > 0) {
                    const changeValue = price - previousClose;
                    changePercent = (changeValue / previousClose) * 100;
                }

                return {
                    label: s.label,
                    price: price,
                    change: (changePercent > 0 ? '+' : '') + changePercent.toFixed(2) + '%',
                    up: changePercent >= 0
                };
            } catch (err) {
                return null;
            }
        });

        const rawResults = await Promise.all(fetchPromises);
        const results = rawResults.filter(Boolean);

        return NextResponse.json(results);
    } catch (error) {
        console.error('Finance API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch external financial data' }, { status: 500 });
    }
}
