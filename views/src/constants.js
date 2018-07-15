
export const fbAppId = '305414106644378';
export const fbPageId = '1748055315208859';

// get base Url
const isProd = process.env.NODE_ENV === 'production';
const baseURL = isProd ? '' : 'http://localhost:3000';
