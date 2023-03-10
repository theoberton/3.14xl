import {
  Action,
  Body,
  Controller,
  Get,
  OnUndefined,
  Param,
  Post,
  UseAfter,
  UseBefore,
  UseInterceptor,
} from "routing-controllers";
import "reflect-metadata";
import { loggingAfter, loggingBefore } from "@/middleware/middleware";
import { Info } from "@/model/info";

@Controller()
// @UseBefore(loggingBefore)
// @UseAfter(loggingAfter)
export class UserController {
  @Get("/users/:id")
  @UseInterceptor(function (action: Action, content: any) {
    console.log('change responsffffe...');
    return content;
  })
  getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }

  @Post('/users/:id')
  @OnUndefined(204)
  postOne(@Param('id') id: number, @Body() info: Info) {
    console.log(JSON.stringify(info));
  }
}
