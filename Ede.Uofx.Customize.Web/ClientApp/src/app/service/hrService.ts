import { BasicApiService } from "./basic-api.service";
import { Injectable } from "@angular/core";
import { leaveType } from "../model/leave";

//記得要在外掛欄位Module的BASIC_SERVICES注入Service

@Injectable()
export class HRService extends BasicApiService {


getLeaveType() {
  return this.http.get<Array<leaveType>>("~/api/Leave/GetLeaveType");
};
}
