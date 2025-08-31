const FAVORITES_KEY = 'favoritePartnerIds';

function safeParse(json: string | null): string[] {
  if (!json) return [];
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function getFavoriteIds(): string[] {
  if (typeof window === 'undefined') return [];
  return safeParse(localStorage.getItem(FAVORITES_KEY));
}

export function isFavorite(id: string): boolean {
  return getFavoriteIds().includes(id);
}

export function addFavorite(id: string) {
  if (typeof window === 'undefined') return;
  const ids = new Set(getFavoriteIds());
  ids.add(id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(ids)));
}

export function removeFavorite(id: string) {
  if (typeof window === 'undefined') return;
  const ids = new Set(getFavoriteIds());
  ids.delete(id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(ids)));
}

export function toggleFavorite(id: string): boolean {
  if (isFavorite(id)) {
    removeFavorite(id);
    return false;
  } else {
    addFavorite(id);
    return true;
  }
}

export function clearFavorites() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
}
