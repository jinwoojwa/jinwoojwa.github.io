const CLOUD_NAME = 'dqtljpdu0';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;

export const optimizeCloudinaryImages = (content) => {
  if (!content) return '';

  // f_auto: 최신 포맷 변환, q_auto: 자동 압축, w_1000: 최대 너비 제한
  const optimizationParams = 'f_auto,q_auto,w_1000/';

  // 원본 URL 패턴을 찾아 최적화 파라미터가 포함된 URL로 교체
  return content.replace(
    new RegExp(BASE_URL.replace(/\//g, '\\/'), 'g'),
    BASE_URL + optimizationParams,
  );
};
