import { animate, state, style, transition, trigger } from "@angular/animations";

export const fadeInOut = trigger('fadeInOut', [
  state('true', style({ opacity: 1})),
  state('void', style({ opacity: 0})),
  transition(':enter', animate('500ms ease-in')),
  transition(':leave', animate('200ms ease-out'))
])
