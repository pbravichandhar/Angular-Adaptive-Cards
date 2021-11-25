import { Component, Inject, OnInit } from '@angular/core';
import * as monaco from "monaco-editor";
import * as markdownit from "markdown-it";
import * as ACDesigner from "adaptivecards-designer";
import { DOCUMENT } from '@angular/common';

// if you want to bundle the designer CSS using something like mini-css-loader:
import "adaptivecards-designer/dist/adaptivecards-designer.css";

// Uncomment below if you choose to pass an empty hostContainers array
import "adaptivecards-designer/dist/adaptivecards-defaulthost.css";

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    ACDesigner.CardDesigner.onProcessMarkdown = (text, result) => {
      result.outputHtml = new markdownit().render(text);
      result.didProcess = true;
    }

    let hostContainers: any = [];

    // Optional: add the default Microsoft Host Apps (see docs below)
    // hostContainers = ACDesigner.defaultMicrosoftHosts;

    let designer = new ACDesigner.CardDesigner(hostContainers);
    designer.attachTo(document.getElementById("designerRootHost") as HTMLElement);
    designer.monacoModuleLoaded(monaco);
  }

}
