import { animate, style, transition, trigger } from "@angular/animations";

export const enterLeftToRight = trigger('enterLeftToRight', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }), // Initial state (animate from left)
    animate('500ms ease-out', style({ transform: 'translateX(0)' })) // Final state (animate to right)
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)' }), // Initial state (animate from right)
    animate('500ms ease-out', style({ transform: 'translateX(-100%)' })) // Final state (animate to left)
  ])
]);



// export const rootAnimation = trigger('rootAnimation', [
//   state('true', style({ opacity: 1})),
//   state('void', style({ opacity: 0})),
//   transition(':enter', animate('500ms ease-in')),
//   transition(':leave', animate('200ms ease-out'))
// ])
