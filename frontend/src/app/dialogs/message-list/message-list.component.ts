import {Component, OnInit, ElementRef, AfterViewInit} from "@angular/core";
import {Input} from "@angular/core/src/metadata/directives";
import {IMessage} from "../../shared/interfaces/IMessage";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit, AfterViewInit {
  @Input() messages: IMessage[];

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(function () {
      this.hostElement.nativeElement.querySelector('.message-list').scrollTop = Number.MAX_VALUE;
    }.bind(this), 0);
  }

}
