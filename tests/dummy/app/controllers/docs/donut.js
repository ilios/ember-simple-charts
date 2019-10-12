import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DocsDonutController extends Controller {
  @tracked tooltipData = null;
  @action
  updateData(data) {
    this.tooltipData = data;
  }
  clearData() {
    this.tooltipData = null;
  }
}
