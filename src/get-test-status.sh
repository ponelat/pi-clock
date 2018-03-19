#!/bin/bash
curl -sLN \
     -u "$QAC_USER:$QAC_PASS" \
     https://app.qacomplete.smartbear.com/rest-api/service/api/v2/projects/100861/testruns?Filter=releaseid%3D183121
