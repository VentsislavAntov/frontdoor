"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleController = void 0;
const common_1 = require("@nestjs/common");
let SampleController = class SampleController {
    getSampleData() {
        return [
            {
                id: 1,
                originalText: 'This is the first original text',
                summary: 'This is the first summary',
                date: '2022-09-15',
                tags: ['Tag A', 'Tag B', 'Tag C', 'Tag D', 'Tag E'],
            },
            {
                id: 2,
                originalText: 'Here is a longer original text for the second item',
                summary: 'And this is a more detailed summary for the second item',
                date: '2022-08-20',
                tags: ['Tag B', 'Tag C'],
            },
            {
                id: 3,
                originalText: 'This is an original text with unique content',
                summary: 'A unique summary that describes the third item',
                date: '2022-10-05',
                tags: ['Tag C', 'Tag D'],
            },
            {
                id: 4,
                originalText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                date: '2022-11-01',
                tags: ['Tag D', 'Tag E'],
            },
            {
                id: 5,
                originalText: 'The fifth item has a very distinct original text',
                summary: 'And an equally distinct summary',
                date: '2022-12-15',
                tags: ['Tag E', 'Tag A'],
            },
        ];
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], SampleController.prototype, "getSampleData", null);
SampleController = __decorate([
    (0, common_1.Controller)('sample')
], SampleController);
exports.SampleController = SampleController;
//# sourceMappingURL=sample.controller.js.map