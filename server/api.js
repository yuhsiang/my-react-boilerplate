const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  next();
});

const tokenResp = { code: 0, message: '', api_version: '1.0', data: { token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTQzMDE3MzIsImlhdCI6MTU1MzY5NjkwMiwic3ViIjoiMTc3YjhmYmVkNGVmNDFiNWEwYzMzMTRiN2M1Nzc0MGQifQ==.R61d8WnMv9_543g3S_Ci_lDJCNjRNDKszad9eAGbFxU' } };

router.post('/login', (req, res) => {
  res.json(tokenResp);
});

module.exports = router;
