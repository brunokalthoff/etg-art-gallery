// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: any, res: any) {
  res.status(200).send([
    {
      name: "ETG#2",
      start: new Date(2022, 8, 10).getTime(),
      end: new Date(2022, 9, 10).getTime(),
      status: "soon!",
    },
    {
      name: "ETG#1",
      start: new Date(2021, 1, 1).getTime(),
      end: new Date(2021, 1, 28).getTime(),
      status: "ended",
    },
    // {
    //     name: "Remember the Mesozoics?",
    //     start: new Date(0).getTime(),
    //     end: new Date(0).getTime(),
    //     status: "ended",
    //   },
    //   {
    //     name: "Nowy",
    //     start: new Date(2021, 1, 1).getTime(),
    //     end: new Date(2023, 1, 1).getTime(),
    //     status: "ended",
    //   },
  ]);
}