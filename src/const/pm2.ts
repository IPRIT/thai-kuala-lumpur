export const PM2_CLUSTER_ID = Number(process.env.NODE_APP_INSTANCE ?? 0);
export const PM2_ENABLED = typeof process.env.NODE_APP_INSTANCE !== 'undefined';
