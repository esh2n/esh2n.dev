import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.slug) {
    res.clearPreviewData();
    res.writeHead(307, { Location: `/scraps/${req.query.slug}` });
    res.end();
  } else {
    res.clearPreviewData();
    res.writeHead(307, { Location: `/scraps` });
    res.end();
  }
};
