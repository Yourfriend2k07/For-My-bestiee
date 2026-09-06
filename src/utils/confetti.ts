import confetti from 'canvas-confetti';

export function fireCuteConfetti(): void {
  const count = 60;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#f472b6', '#ec4899', '#c084fc', '#a855f7', '#fb7185', '#fde047'],
  };

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.7),
    spread: 60,
  });
  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.5),
    spread: 100,
  });
}

export function fireHugeCelebration(): void {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#f472b6', '#fb7185', '#e879f9', '#c084fc', '#38bdf8', '#fbbf24', '#f43f5e'];

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.75 },
      colors,
    });

    // Right cannon
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.75 },
      colors,
    });
  }, 220);
}

export function fireHeartBurst(): void {
  // Burst from middle
  confetti({
    particleCount: 50,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#f43f5e', '#ec4899', '#f472b6', '#fda4af'],
    shapes: ['circle'],
  });
}
