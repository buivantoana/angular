import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @Input() productChild: any;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  onDeleteProduct(id: number) {
    this.onDelete.emit(id);
  }
  onUpdateProduct(product: any) {
    this.onUpdate.emit(product);
  }
}
