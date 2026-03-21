const CLOUD_NAME = 'dqtljpdu0';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;

export const optimizeCloudinaryImages = (content) => {
  if (!content) return '';

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const widthParam = isMobile ? 'w_500' : 'w_800';
  const optimizationParams = `f_auto,q_auto,${widthParam}/`;

  // 원본 URL 패턴을 찾아 최적화 파라미터가 포함된 URL로 교체
  return content.replace(
    new RegExp(BASE_URL.replace(/\//g, '\\/'), 'g'),
    BASE_URL + optimizationParams,
  );
};
