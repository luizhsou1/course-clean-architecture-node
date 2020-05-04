import { Request, Response, NextFunction } from 'express'; // json faz exatamente o que o body parser fazia, o express integrou essa biblioteca dentro dele

export const cors = (req: Request, res: Response, next: NextFunction) => {
  res.set('acess-control-allow-origin', '*');
  res.set('acess-control-allow-methods', '*');
  res.set('acess-control-allow-headers', '*');
  next();
};
