import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    await this.controller.handle(HttpRequest)
    return new Promise(resolve => resolve({
      statusCode: 500,
      body: {
        name: 'John Doe'
      }
    }))
  }
}
