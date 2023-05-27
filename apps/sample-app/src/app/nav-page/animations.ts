import { animate, state, style, transition, trigger } from "@angular/animations";

export const contentWidthAnimation = trigger('contentWidthAnimation', [
  state('400px', style({ width: '400px' })),
  state('800px', style({ width: '800px' })),
  transition('400px <=> 800px', animate('200ms ease-in-out')),
]);


