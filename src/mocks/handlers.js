import { rest } from 'msw'

export const handlers = [
    rest.get('*/weather-comparison', (req, res, ctx) => {
        const location = req.url.searchParams.get('location').toLowerCase()

        if (location === 'riga') {
            return res(ctx.status(404))
        }

        const address =
            location === 'estonia'
                ? 'Estonia, the Baltics'
                : 'Barcelona, Catalunya, Espanya'

        return res(
            ctx.status(200),
            ctx.json({
                address,
                days: [
                    {
                        datetime: '2021-02-21',
                        temp:
                            location.toLowerCase() === 'estonia' ? -13.1 : 13.1,
                    },
                    {
                        datetime: '2011-02-21',
                        temp:
                            location.toLowerCase() === 'estonia' ? -11.0 : 11.0,
                    },
                    {
                        datetime: '2001-02-21',
                        temp:
                            location.toLowerCase() === 'estonia' ? -18.8 : 8.8,
                    },
                    {
                        datetime: '1991-02-21',
                        temp:
                            location.toLowerCase() === 'estonia' ? -11.2 : 11.2,
                    },
                    {
                        datetime: '1981-02-21',
                        temp:
                            location.toLowerCase() === 'estonia' ? -13.6 : 3.6,
                    },
                    {
                        datetime: '1973-02-21',
                        temp:
                            location.toLowerCase() === 'estonia' ? -17.5 : 7.5,
                    },
                ],
            }),
        )
    }),
]
