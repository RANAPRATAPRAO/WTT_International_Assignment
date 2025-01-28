export const generateRandomValue = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  };
