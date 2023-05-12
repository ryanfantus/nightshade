import inquirer from 'inquirer';

export async function startSysopConsole() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: [
          'View logs',
          'Configure BBS',
          'Monitor BBS',
          'Exit',
        ],
      },
    ]);

    switch (action) {
      case 'View logs':
        // Your code to display logs
        break;
      case 'Configure BBS':
        // Your code to configure the BBS
        break;
      case 'Monitor BBS':
        // Your code to monitor the BBS
        break;
      case 'Exit':
        return;
      default:
        console.log('Invalid action');
    }
  }
}
