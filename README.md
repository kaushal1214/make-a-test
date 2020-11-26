# MCQ

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Add Questions
To add questions, follow the steps:
1) Create a new directory in 'assets' folder of the project, with a name -'questions'
2) Inside the 'questions' folder, add questions by creating a new file 'que1.json' and write details as :
   `{`
      `question: "<Your question>",`
      `option1: "<option1>",`
      `option2:"<option2>",`
      `option3:"<option3",`
      `option4:"<option4",`
      `answer:"<correct option. Example 'option1'>",`
      `image:"<image file name, that is saved in assets/images dir. Example, if you have copied 'apple.jpg' then type the full name with extension>"`
      `}`
3) Add questions in the format like above and save the file as que1.json, que2.json and so on
4) Last, create a `summary.json` file in the same directory.
5) Content of `summary.json`: 
   {
     total: <number of questions>,
     hh: '<hours>',
     mm: '<minutes>',
     ss: '<seconds>'
  }
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

