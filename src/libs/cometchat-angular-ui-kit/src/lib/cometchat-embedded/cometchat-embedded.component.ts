import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { SIDEBAR_ACTIONS, NAVIGATION_MENU_ACTIONS, CONVERSATIONS_SCREEN_ACTIONS, CALL_SCREEN_ACTIONS } from '../string_constants';
import { CometChatMainManager } from './cometchat-manager';
import { pathToFileURL } from 'url';

@Component({
  selector: 'cometchat-embedded',
  templateUrl: './cometchat-embedded.component.html',
  styleUrls: ['./cometchat-embedded.component.scss']
})
export class CometchatEmbeddedComponent implements OnInit {
  showChat = false;
  user?: object;
  json = JSON;
  group?: object;
  votes;
  inProgressCall;
  incomingScreen;
  @Input() friendsOnly?= false;
  cometchatManager: CometChatMainManager = new CometChatMainManager();
  sidebarActions: { action: string, payload?: object | any } = { action: "" }
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.votes = [
      {name: 'John', number: 24},
      {name: 'George', number: 8394},
      {name: 'Mansey', number: 239},
      {name: 'Jen', number: 23283},
      {name: 'Gerry', number: 328},
      {name: 'Terry', number: 987},
      {name: 'Katie', number: 434789},
      {name: 'William', number: 3478},
      {name: 'Savanah', number: 384834},
      {name: 'Elise', number: 348},
      {name: 'June', number: 394388},
      {name: 'Diane', number: 343},
      {name: 'Yovonne', number: 1349},
      {name: 'Bruce', number: 3434},
      {name: 'John', number: 9895},
      {name: 'Dan', number: 5738}
  ]

    this.cometchatManager.isLoggedIn(() => {
      this.cometchatManager.attachListener((event) => {

        switch (event.action) {
          case CALL_SCREEN_ACTIONS.INCOMING_CALL_RECEIVED: {
            this.incomingScreen = false;
            setTimeout(() => {
              this.incomingScreen = true;
              this.inProgressCall = JSON.stringify(event.payload.call);
              this.cdRef.detectChanges();
            }, 300)
            this.cdRef.detectChanges();
            break;
          }
          case CALL_SCREEN_ACTIONS.INCOMING_CALL_CANCELLED: {
            this.incomingScreen = false;
            this.inProgressCall = JSON.stringify(event.payload.call);
            this.cdRef.detectChanges();
            break
          }
        }
      });
    })
  }

  toggleChat() {
    this.showChat = !this.showChat;
  }

  links = [
    {name: 'Home', url: '/home'},
    {name: 'Create Survey', url: '/create'},
    {name: 'Survey Results', url: '/results'}
  ]

  handleCallScreenActions = (event) => {
    let tempUser = this.user;
    let tempGroup = this.group;
    this.user = undefined;
    this.group = undefined;
    this.cdRef.detectChanges();
    this.user = tempUser;
    this.group = tempGroup;
    this.cdRef.detectChanges();


  }
  /**
   * Handles sidebar events
   * @param event:{ action: string, payload: object }
   * Recives all the events perfomed on the each child of the side-bar-component.
   */
  handleSidebarEvents(event) {
    switch (event.action) {
      case SIDEBAR_ACTIONS.ITEM_SELECTED:
        this.toggleChat();
        const type = event.payload.type;
        const item = event.payload.item;
        if (type === 'group') {
          this.group = item;
          this.user = undefined;
        } else {
          this.user = item;
          this.group = undefined;
        }
        break;
      case SIDEBAR_ACTIONS.CHAT_OPTIONS:
        // TODO handle an event
        break;
      case SIDEBAR_ACTIONS.HELP_OPTIONS:
        // TODO handle an event
        break;
      case SIDEBAR_ACTIONS.MORE_INFO_ITEM_SELECTED:
        // TODO handle an event
        break;
      case SIDEBAR_ACTIONS.NOTIFICATION_OPTIONS:
        // TODO handle an event
        break;
      case SIDEBAR_ACTIONS.PRIVACY_AND_SECURITY_OPTION:
        // TODO handle an event
        break;
      case SIDEBAR_ACTIONS.REPORT_A_PROBLEM:
        // TODO handle an event
        break;
      case NAVIGATION_MENU_ACTIONS.TAB_CHANGED:
        // TODO handle tab changed
        break;
    }
    this.cdRef.detectChanges();
  }

  /**
   * Handles action by conversation screen
   * @param event: {action:string,payload?:any}
   */
  handleActionByConversationScreen = (event: { action: string, payload?: object | any }) => {

    switch (event.action) {

      case CONVERSATIONS_SCREEN_ACTIONS.MESSAGES_COMPOSER_ACTIONS.MESSAGE_SENT: {
        this.sidebarActions = event;
        break;
      }
      case CONVERSATIONS_SCREEN_ACTIONS.MEDIA_MESSAGES_COMPOSER_ACTIONS.MEDIA_MESSAGE_SENT: {
        this.sidebarActions = event;
        break;
      } case CONVERSATIONS_SCREEN_ACTIONS.ADD_MEMBERES_CONTS.ACTIONS.MEMBERS_ADDED: {
        this.sidebarActions = event;
        break;
      }
      case CONVERSATIONS_SCREEN_ACTIONS.CONVERSATION_SCREEN_HEADER_ACTIONS.AUDIO_CALL_STARTED: {

        this.inProgressCall = JSON.stringify(event.payload.outGoingCall);

        break;
      }
      case CONVERSATIONS_SCREEN_ACTIONS.CONVERSATION_SCREEN_HEADER_ACTIONS.VIDEO_CALL_STARTED: {

        this.inProgressCall = JSON.stringify(event.payload.outGoingCall);

        break;
      }
    }
    this.cdRef.detectChanges();
  }
}
