// backend/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ error: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;  // attach user info to req
    next();
  });
}

// Middleware for HR-only access
export function hrOnly(req, res, next) {
  if (req.user.department !== 'HR') {
    return res.status(403).json({ error: 'Access denied. Only HR allowed.' });
  }
  next();
}
