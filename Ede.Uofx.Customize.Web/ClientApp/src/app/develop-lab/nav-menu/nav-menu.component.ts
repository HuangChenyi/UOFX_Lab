import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  public menuItems = [
    {
      text: 'Template Plugin',
      subItems: [
        { text: 'Design', url: 'template-field/design' },
        { text: 'Props', url:  'template-field/props' },
        { text: 'Write', url:  'template-field/write' },
        { separator: true },
        { text: 'App', url: 'advanced-field/app' },
      ]
    },
  ];
}
