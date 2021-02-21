import { rest } from 'msw'

export const handlers = [
    rest.get('*/weather', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                address: 'Barcelona, Catalunya, Espanya',
                days: [
                    {
                        datetime: '2021-02-21',
                        temp: 13.1,
                    },
                    {
                        datetime: '2011-02-21',
                        temp: 11.0,
                    },
                    {
                        datetime: '2001-02-21',
                        temp: 8.8,
                    },
                    {
                        datetime: '1991-02-21',
                        temp: 11.2,
                    },
                    {
                        datetime: '1981-02-21',
                        temp: 3.6,
                    },
                    {
                        datetime: '1973-02-21',
                        temp: 7.5,
                    },
                ],
            }),
        )
    }),
]
