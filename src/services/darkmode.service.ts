import { Injectable, signal } from '@angular/core';
export enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark',
};


// for SSR and SSG support.
const CLIENT_RENDER = typeof localStorage !== 'undefined';
// name of variable in localStorage.
const LS_THEME = 'theme';
// previously selected value by user, if available.
let selectedTheme: AppTheme | undefined = undefined;
// if render happens on client side
if (CLIENT_RENDER) {
  // then set value from localStorage or if it not available leave it undefined.
  selectedTheme = localStorage.getItem(LS_THEME) as AppTheme || undefined;
}

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {

  darkModeSignal = signal<string>('null');

  currentTheme = signal<AppTheme | undefined>(selectedTheme);
  setLightTheme() {
    this.currentTheme.set(AppTheme.LIGHT);
    this.setToLocalStorage(AppTheme.LIGHT);
    this.removeClassFromHtml('dark');
  }
  setDarkTheme() {
    this.currentTheme.set(AppTheme.DARK);
    this.setToLocalStorage(AppTheme.DARK);
    this.addClassToHtml('dark');
  }
  setSystemTheme() {
    this.currentTheme.set(undefined);
    this.removeFromLocalStorage();
    if (isSystemDark()) {
      this.addClassToHtml('dark');
    } else {
      this.removeClassFromHtml('dark');
    }
  }
  private addClassToHtml(className: string) {
    if (CLIENT_RENDER) {
      this.removeClassFromHtml(className);
      document.documentElement.classList.add(className)
    }
  }
  private removeClassFromHtml(className: string) {
    if (CLIENT_RENDER) {
      document.documentElement.classList.remove(className)
    }
  }
  private setToLocalStorage(theme: AppTheme) {
    if (CLIENT_RENDER) {
      localStorage.setItem(LS_THEME, theme);
    }
  }
  private removeFromLocalStorage() {
    if (CLIENT_RENDER) {
      localStorage.removeItem(LS_THEME);
    }
  }
  updateDarkMode() {
    this.darkModeSignal.update((value) => (value === 'dark' ? "null" : "dark"));
  }
  constructor() { }
}
function isSystemDark() {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } else {
    return false;
  }
}