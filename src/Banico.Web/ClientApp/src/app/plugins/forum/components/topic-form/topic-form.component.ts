import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subforum } from '../../entities/subforum';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss']
})
export class TopicFormComponent implements OnInit {
  public subforum: Subforum;

  public topicForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    subforumId: ['', Validators.required],
    title: ['', Validators.required],
    text: ['', Validators.required]
  });

  constructor(
    private topicService: TopicService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
  }

  public save() {
    // this.isRequesting = true;
    var id = this.topicForm.value['id'];
    this.topicService.addOrUpdate(
      id,
      this.topicForm.value['subforumId'],
      this.topicForm.value['title'],
      this.topicForm.value['text']
    )
    .subscribe(
      id => {
        this.router.navigate(['/forum/topic/' + id]);
      },
      //errors =>  this.errors = errors
      );
  }
}
