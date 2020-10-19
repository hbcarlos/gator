import { Dialog, showDialog } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import * as React from 'react';
import { Gator, GatorFrontEndPlugin } from '../../app/app';
import { mambaIcon } from '../../icons';
import { MainMenu } from './menu';
import { IMainMenu } from './tokens';

/**
 * The command IDs used by the top plugin.
 */
namespace CommandIDs {
  export const about = 'help:about';
}

/**
 * The main menu plugin.
 */
const plugin: GatorFrontEndPlugin<IMainMenu> = {
  id: '@mamba-org/navigator:menu',
  autoStart: true,
  provides: IMainMenu,
  activate: (app: Gator): IMainMenu => {
    const logo = new Widget();
    mambaIcon.element({
      container: logo.node,
      elementPosition: 'center',
      margin: '2px 2px 2px 8px',
      height: 'auto',
      width: '16px'
    });
    logo.id = 'mamba-logo';

    const { commands } = app;

    commands.addCommand(CommandIDs.about, {
      label: `About ${app.name}`,
      execute: () => {
        const title = (
          <span className="about-header">
            <mambaIcon.react margin="7px 9.5px" height="auto" width="58px" />
            <div className="about-header-info">About the Mamba Navigator</div>
          </span>
        );

        const mambaNavigatorUrl = 'https://github.com/mamba-org/jupyter_conda';
        const externalLinks = (
          <span>
            <a
              href={mambaNavigatorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="jp-Button-flat about-externalLinks"
            >
              MAMBA NAVIGATOR ON GITHUB
            </a>
          </span>
        );
        const body = <div className="about-body">{externalLinks}</div>;

        return showDialog({
          title,
          body,
          buttons: [
            Dialog.createButton({
              label: 'Dismiss',
              className: 'about-button jp-mod-reject jp-mod-styled'
            })
          ]
        });
      }
    });

    const menu = new MainMenu({ commands });
    menu.id = 'navigator-menu';
    menu.helpMenu.addGroup([{ command: CommandIDs.about }]);

    app.shell.add(logo, 'top');
    app.shell.add(menu, 'top');

    return menu;
  }
};

export default plugin;
