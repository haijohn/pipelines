// Copyright 2018 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { ApiExperiment } from '../src/apis/experiment';
import { ApiJob } from '../src/apis/job';
import { ApiPipeline, ApiPipelineVersion } from '../src/apis/pipeline';
import { ApiRelationship, ApiResourceType, ApiRunDetail, RunMetricFormat } from '../src/apis/run';
import v2_lightweight_python_pipeline from './data/v2/pipeline/mock_lightweight_python_functions_v2_pipeline.json';
import xgboost_sample_pipeline from './data/v2/pipeline/xgboost_sample_pipeline.json';
import helloWorldRun from './hello-world-runtime';
import helloWorldWithStepsRun from './hello-world-with-steps-runtime';
import jsonRun from './json-runtime';
import largeGraph from './large-graph-runtime';
import coinflipRun from './mock-coinflip-runtime';
import errorRun from './mock-error-runtime';
import retryRun from './mock-retry-runtime';
import xgboostRun from './mock-xgboost-runtime';

function padStartTwoZeroes(str: string): string {
  let padded = str || '';
  while (padded.length < 2) {
    padded = '0' + padded;
  }
  return padded;
}

// The number of simple, dummy Pipelines, Jobs, and Runs that will be appended to the list.
const NUM_DUMMY_PIPELINES = 30;
const NUM_DUMMY_JOBS = 20;
const NUM_DUMMY_RUNS = 20;

const PIPELINE_ID_V2_PYTHON_TWO_STEPS = '8fbe3bd6-a01f-11e8-98d0-529269fb1460';
const PIPELINE_V2_PYTHON_TWO_STEPS_DEFAULT: ApiPipelineVersion = {
  created_at: new Date('2021-11-24T20:58:23.000Z'),
  id: PIPELINE_ID_V2_PYTHON_TWO_STEPS,
  name: 'default version',
  description: 'This is default version description.',
  parameters: [
    {
      name: 'message',
    },
  ],
};
const PIPELINE_V2_PYTHON_TWO_STEPS: ApiPipeline = {
  ...PIPELINE_V2_PYTHON_TWO_STEPS_DEFAULT,
  description: 'This is pipeline level description.',
  name: 'v2_lightweight_python_functions_pipeline',
  default_version: PIPELINE_V2_PYTHON_TWO_STEPS_DEFAULT,
};

const PIPELINE_ID_V2_PYTHON_TWO_STEPS_REV = '9fbe3bd6-a01f-11e8-98d0-529269fb1460';
const PIPELINE_V2_PYTHON_TWO_STEPS_REV: ApiPipelineVersion = {
  created_at: new Date('2021-12-24T20:58:23.000Z'),
  id: PIPELINE_ID_V2_PYTHON_TWO_STEPS_REV,
  name: 'revision',
  code_source_url:
    'https://github.com/kubeflow/pipelines/blob/master/sdk/python/kfp/v2/compiler_cli_tests/test_data/lightweight_python_functions_v2_pipeline.py',
  description: 'This is version description.',
  parameters: [
    {
      name: 'revision-message',
    },
  ],
};

const PIPELINE_ID_V2_LOOPS_CONDITIONS = '8fbe3bd6-a01f-11e8-98d0-529269fb1461';
const PIPELINE_V2_LOOPS_CONDITIONS_DEFAULT: ApiPipelineVersion = {
  created_at: new Date('2021-04-13T20:58:23.000Z'),
  id: PIPELINE_ID_V2_LOOPS_CONDITIONS,
  name: 'v2_loops_and_conditions',
  parameters: [],
};
const PIPELINE_V2_LOOPS_CONDITIONS: ApiPipeline = {
  description: 'V2 Sub-DAG: Loops and Conditions.',
  ...PIPELINE_V2_LOOPS_CONDITIONS_DEFAULT,
  default_version: PIPELINE_V2_LOOPS_CONDITIONS_DEFAULT,
};

const PIPELINE_ID_V2_XGBOOST = '8fbe3bd6-a01f-11e8-98d0-529269fb1462';
const PIPELINE_V2_XGBOOST_DEFAULT: ApiPipelineVersion = {
  created_at: new Date('2021-02-24T20:58:23.000Z'),
  id: PIPELINE_ID_V2_XGBOOST,
  name: 'v2_xgboost',
  parameters: [],
};
const PIPELINE_V2_XGBOOST: ApiPipeline = {
  description: 'V2 Xgboost sample pipeline.',
  ...PIPELINE_V2_XGBOOST_DEFAULT,
  default_version: PIPELINE_V2_XGBOOST_DEFAULT,
};

const PIPELINE_UNSTRUCTURED_ID = '8fbe3bd6-a01f-11e8-98d0-529269fb1459';
const PIPELINE_UNSTRUCTED_TEXT_DEFAULT: ApiPipelineVersion = {
  created_at: new Date('2018-04-01T20:58:23.000Z'),
  id: PIPELINE_UNSTRUCTURED_ID,
  name: 'Unstructured text',
  description: 'Pipeline version description',
  parameters: [
    {
      name: 'x',
    },
    {
      name: 'y',
    },
    {
      name: 'output',
    },
  ],
};
const PIPELINE_UNSTRUCTED_TEXT: ApiPipeline = {
  description: 'An unstructured text pipeline.',
  ...PIPELINE_UNSTRUCTED_TEXT_DEFAULT,
  default_version: PIPELINE_UNSTRUCTED_TEXT_DEFAULT,
};

const PIPELINE_IMAGE_CLASSIFICATION_DEFAULT: ApiPipelineVersion = {
  created_at: new Date('2018-04-02T20:59:29.000Z'),
  id: '8fbe3f78-a01f-11e8-98d0-529269fb1459',
  name: 'Image classification',
  parameters: [
    {
      name: 'project',
    },
    {
      name: 'workers',
    },
    {
      name: 'rounds',
    },
    {
      name: 'output',
    },
  ],
};
const PIPELINE_IMAGE_CLASSIFICATION: ApiPipeline = {
  description: 'An awesome image classification pipeline.',
  ...PIPELINE_IMAGE_CLASSIFICATION_DEFAULT,
  default_version: PIPELINE_IMAGE_CLASSIFICATION_DEFAULT,
};

const PIPELINE_NO_PARAM_DEFAULT: ApiPipelineVersion = {
  created_at: new Date('2018-04-03T20:58:23.000Z'),
  id: '8fbe41b2-a01f-11e8-98d0-529269fb1459',
  name: 'No parameters',
  parameters: [],
};
const PIPELINE_NO_PARAM: ApiPipeline = {
  description: 'This pipeline has no parameters',
  ...PIPELINE_NO_PARAM_DEFAULT,
  default_version: PIPELINE_NO_PARAM_DEFAULT,
};

const PIPELINE_UNDEFINED_PARAM_DEFAULT: ApiPipelineVersion = {
  created_at: new Date('2018-04-04T20:58:23.000Z'),
  id: '8fbe42f2-a01f-11e8-98d0-529269fb1459',
  name: 'Undefined parameters',
  parameters: undefined as any,
};
const PIPELINE_UNDEFINED_PARAM: ApiPipeline = {
  description: 'This pipeline has undefined parameters',
  ...PIPELINE_UNDEFINED_PARAM_DEFAULT,
  default_version: PIPELINE_UNDEFINED_PARAM_DEFAULT,
};

const pipelines: ApiPipeline[] = [
  PIPELINE_UNSTRUCTED_TEXT,
  PIPELINE_IMAGE_CLASSIFICATION,
  PIPELINE_NO_PARAM,
  PIPELINE_UNDEFINED_PARAM,
  {
    created_at: new Date('2018-04-01T20:59:23.000Z'),
    description: 'Trying to delete this Pipeline will result in an error.',
    id: '8fbe3bd6-a01f-11e8-98d0-529269fb1460',
    name: 'Cannot be deleted',
    parameters: [
      {
        name: 'xx',
      },
      {
        name: 'yy',
      },
      {
        name: 'output',
      },
    ],
  },
  {
    created_at: new Date('2019-10-25T20:59:23.000Z'),
    description:
      'A pipeline using [markdown](https://en.wikipedia.org/wiki/Markdown) for description.',
    id: '8fbe3bd6-a01f-11e8-98d0-529269fb1461',
    name: 'Markdown description',
    parameters: [],
  },
  {
    created_at: new Date('2020-01-22T20:59:23.000Z'),
    description: 'A pipeline with a long name',
    id: '9fbe3bd6-a01f-11e8-98d0-529269fb1462',
    name: 'A pipeline with a very very very very very very very long name',
    parameters: [],
  },
  PIPELINE_V2_PYTHON_TWO_STEPS,
  PIPELINE_V2_LOOPS_CONDITIONS,
  PIPELINE_V2_XGBOOST,
];

pipelines.push(...generateNPipelines());

const jobs: ApiJob[] = [
  {
    created_at: new Date('2018-03-01T21:58:23.000Z'),
    description: 'This job has no runs',
    enabled: true,
    id: '7fc01714-4a13-4c05-5902-a8a72c14253b',
    max_concurrency: '10',
    name: 'No Runs',
    pipeline_spec: {
      parameters: [
        {
          name: 'project',
          value: 'my-cloud-project',
        },
        {
          name: 'workers',
          value: '6',
        },
        {
          name: 'rounds',
          value: '25',
        },
        {
          name: 'output',
          value: 'gs://path-to-my-project',
        },
      ],
      pipeline_id: pipelines[0].id,
      pipeline_name: pipelines[0].name,
    },
    resource_references: [
      {
        key: {
          id: '275ea11d-ac63-4ce3-bc33-ec81981ed56a',
          type: ApiResourceType.EXPERIMENT,
        },
        relationship: ApiRelationship.OWNER,
      },
    ],
    status: 'Failed:Succeeded',
    trigger: {
      cron_schedule: {
        cron: '30 1 * * * ?',
        end_time: new Date('2018-04-01T21:58:23.000Z'),
        start_time: new Date('2018-03-01T21:58:23.000Z'),
      },
    },
    updated_at: new Date('2018-03-01T21:58:23.000Z'),
  },
  {
    created_at: new Date('2018-03-02T22:58:23.000Z'),
    description: 'This job cannot be deleted',
    enabled: false,
    id: '7fc01714-4a13-4c05-7186-a8a72c14253b',
    max_concurrency: '10',
    name: 'Cannot be deleted - 1',
    pipeline_spec: {
      parameters: [
        {
          name: 'x',
          value: '10',
        },
        {
          name: 'y',
          value: '20',
        },
        {
          name: 'output',
          value: 'some-output-path',
        },
      ],
      pipeline_id: pipelines[1].id,
      pipeline_name: pipelines[1].name,
    },
    resource_references: [
      {
        key: {
          id: '275ea11d-ac63-4ce3-bc33-ec81981ed56a',
          type: ApiResourceType.EXPERIMENT,
        },
        relationship: ApiRelationship.OWNER,
      },
    ],
    status: 'Succeeded',
    trigger: {
      cron_schedule: {
        cron: '0 0 * * * ?',
        start_time: new Date('2018-03-01T21:58:23.000Z'),
      },
    },
    updated_at: new Date('2018-03-02T22:58:23.000Z'),
  },
  {
    created_at: new Date('2018-03-03T23:58:23.000Z'),
    description: 'This job cannot be deleted',
    enabled: true,
    id: '7fc01714-4a13-4c05-8957-a8a72c14253b',
    max_concurrency: '10',
    name: 'Cannot be deleted - 2',
    pipeline_spec: {
      parameters: [
        {
          name: 'project',
          value: 'my-other-cloud-project',
        },
        {
          name: 'workers',
          value: '12',
        },
        {
          name: 'rounds',
          value: '50',
        },
        {
          name: 'output',
          value: 'gs://path-to-my-other-project',
        },
      ],
      pipeline_id: pipelines[2].id,
      pipeline_name: pipelines[2].name,
    },
    resource_references: [
      {
        key: {
          id: '275ea11d-ac63-4ce3-bc33-ec81981ed56a',
          type: ApiResourceType.EXPERIMENT,
        },
        relationship: ApiRelationship.OWNER,
      },
    ],
    status: 'Succeeded',
    trigger: {
      periodic_schedule: {
        end_time: new Date('2018-03-03T23:58:23.000Z'),
        interval_second: '439652',
      },
    },
    updated_at: new Date('2018-03-03T23:58:23.000Z'),
  },
];

jobs.push(...generateNJobs());

const experiments: ApiExperiment[] = [
  {
    description: 'This experiment includes KFP v2 runs',
    id: '275ea11d-ac63-4ce3-bc33-ec81981ed56b',
    name: 'KFP v2 Runs',
  },
  {
    description: 'This experiment has no runs',
    id: '7fc01714-4a13-4c05-5902-a8a72c14253b',
    name: 'No Runs',
  },
  {
    description: 'A Pipeline experiment with runs',
    id: '275ea11d-ac63-4ce3-bc33-ec81981ed56a',
    name: 'Kubeflow Pipelines Experiment',
  },
  {
    description:
      'A different Pipeline experiment used to group runs. ' +
      'This experiment also has a very long description, which should overflow the container card.',
    id: 'a4d4f8c6-ce9c-4200-a92e-c48ec759b733',
    name: 'Experiment Number 2',
  },
  {
    description: 'This experiment has a very very very long name',
    id: 'z4d4f8c6-ce9c-4200-a92e-c48ec759b733',
    name: 'Experiment with a very very very very very very very very very very very very long name',
  },
];

const versions: ApiPipelineVersion[] = [
  {
    created_at: new Date('2021-02-06T20:58:23.000Z'),
    id: PIPELINE_UNSTRUCTURED_ID + '1',
    name: 'v1',
    description: 'Some arbitrary version description',
    parameters: [
      {
        name: 'message',
      },
    ],
  },
  {
    created_at: new Date('2021-08-01T20:58:23.000Z'),
    id: PIPELINE_UNSTRUCTURED_ID + '2',
    name: 'v2',
    parameters: [
      {
        name: 'message',
      },
    ],
  },
];

const runs: ApiRunDetail[] = [
  {
    pipeline_runtime: {
      // workflow_manifest: JSON.stringify(coinflipRun),
    },
    run: {
      created_at: new Date('2021-05-17T20:58:23.000Z'),
      description: 'V2 xgboost',
      finished_at: new Date('2021-05-18T21:01:23.000Z'),
      id: 'e0115ac1-0479-4194-a22d-01e65e09a32b',
      name: 'v2-xgboost-ilbo',
      pipeline_spec: {
        pipeline_id: PIPELINE_V2_XGBOOST.id,
        pipeline_name: PIPELINE_V2_XGBOOST_DEFAULT.name,
        workflow_manifest: JSON.stringify(xgboost_sample_pipeline),
      },
      resource_references: [
        {
          key: {
            id: '275ea11d-ac63-4ce3-bc33-ec81981ed56b',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('2021-05-17T20:58:23.000Z'),
      status: 'Succeeded',
    },
  },
  {
    pipeline_runtime: {
      // workflow_manifest: JSON.stringify(coinflipRun),
    },
    run: {
      created_at: new Date('2021-04-17T20:58:23.000Z'),
      description: 'V2 two steps run from pipeline template',
      finished_at: new Date('2021-04-18T21:01:23.000Z'),
      id: 'c1e11ff7-e1af-4a8d-a9e4-718f32934ae0',
      name: 'v2-lightweight-two-steps-i5jk',
      pipeline_spec: {
        pipeline_id: PIPELINE_V2_PYTHON_TWO_STEPS_DEFAULT.id,
        pipeline_name: PIPELINE_V2_PYTHON_TWO_STEPS_DEFAULT.name,
        workflow_manifest: JSON.stringify(v2_lightweight_python_pipeline),
      },
      resource_references: [
        {
          key: {
            id: '275ea11d-ac63-4ce3-bc33-ec81981ed56b',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('2021-04-17T20:58:23.000Z'),
      status: 'Succeeded',
    },
  },
  {
    pipeline_runtime: {
      // workflow_manifest: JSON.stringify(v2_lightweight_python_pipeline),
    },
    run: {
      created_at: new Date('2021-03-17T20:58:23.000Z'),
      description: 'V2 two steps run from SDK',
      finished_at: new Date('2021-03-18T21:01:23.000Z'),
      id: '3308d0ec-f1b3-4488-a2d3-8ad0f91e88f8',
      name: 'v2-lightweight-two-steps-jk4u',
      pipeline_spec: {
        workflow_manifest: JSON.stringify(v2_lightweight_python_pipeline),
      },
      resource_references: [
        {
          key: {
            id: '275ea11d-ac63-4ce3-bc33-ec81981ed56b',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('2021-03-17T20:58:23.000Z'),
      status: 'Succeeded',
    },
  },
  {
    pipeline_runtime: {
      workflow_manifest: JSON.stringify(coinflipRun),
    },
    run: {
      created_at: new Date('2018-03-17T20:58:23.000Z'),
      description: 'A recursive coinflip run',
      finished_at: new Date('2018-03-18T21:01:23.000Z'),
      id: '3308d0ec-f1b3-4488-a2d3-8ad0f91e88e7',
      metrics: [
        {
          format: RunMetricFormat.PERCENTAGE,
          name: 'accuracy',
          node_id: 'coinflip-recursive-q7dqb',
          number_value: 0.6762,
        },
        {
          format: RunMetricFormat.RAW,
          name: 'log_loss',
          node_id: 'coinflip-recursive-q7dqb',
          number_value: -0.573,
        },
      ],
      name: 'coinflip-recursive-run-lknlfs3',
      pipeline_spec: {
        parameters: [
          { name: 'paramName1', value: 'paramVal1' },
          { name: 'paramName2', value: 'paramVal2' },
        ],
        pipeline_id: pipelines[0].id,
        pipeline_name: pipelines[0].name,
      },
      resource_references: [
        {
          key: {
            id: '275ea11d-ac63-4ce3-bc33-ec81981ed56a',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('2018-03-17T20:58:23.000Z'),
      status: 'Failed:Succeeded',
    },
  },
  {
    pipeline_runtime: {
      workflow_manifest: JSON.stringify(errorRun),
    },
    run: {
      error: 'Mock error retrieving this run. All fields will be empty besides ID and this',
      id: 'f9486999-e853-40ee-993d-a0199b2cb7bd',
    },
  },
  {
    pipeline_runtime: {
      workflow_manifest: JSON.stringify(errorRun),
    },
    run: {
      created_at: new Date('2018-04-17T21:00:00.000Z'),
      description: 'A coinflip run with an error. No metrics',
      finished_at: new Date('2018-04-17T21:00:33.000Z'),
      id: '47a3d09c-7db4-4788-ac55-3f8d908574aa',
      metrics: [],
      name: 'coinflip-error-nklng2',
      pipeline_spec: {
        parameters: [
          { name: 'paramName1', value: 'paramVal1' },
          { name: 'paramName2', value: 'paramVal2' },
        ],
        pipeline_id: pipelines[0].id,
        pipeline_name: pipelines[0].name,
      },
      resource_references: [
        {
          key: {
            id: '275ea11d-ac63-4ce3-bc33-ec81981ed56a',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('2018-04-17T21:00:00.000Z'),
      status: 'Error',
    },
  },
  {
    pipeline_runtime: {
      workflow_manifest: JSON.stringify(jsonRun),
    },
    run: {
      created_at: new Date('2018-05-17T21:58:23.000Z'),
      description: 'A simple run with json input',
      id: '183ac01f-dc26-4ebf-b817-7b3f96fdc3ac',
      metrics: [
        {
          format: RunMetricFormat.PERCENTAGE,
          name: 'accuracy',
          node_id: 'json-12abc',
          number_value: 0.5423,
        },
      ],
      name: 'json-12abc',
      pipeline_spec: {
        parameters: [
          { name: 'paramName1', value: 'paramVal1' },
          { name: 'paramName2', value: 'paramVal2' },
        ],
        pipeline_id: pipelines[2].id,
        pipeline_name: pipelines[2].name,
      },
      resource_references: [
        {
          key: {
            id: 'a4d4f8c6-ce9c-4200-a92e-c48ec759b733',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('2018-05-17T21:58:23.000Z'),
      status: 'Running',
    },
  },
  {
    pipeline_runtime: {
      workflow_manifest: JSON.stringify(helloWorldRun),
    },
    run: {
      created_at: new Date('2018-05-17T21:58:23.000Z'),
      description: 'A simple hello world run',
      id: 'fa5d897e-88d3-4dfc-b189-9dea6947c9bc',
      metrics: [
        {
          format: RunMetricFormat.PERCENTAGE,
          name: 'accuracy',
          node_id: 'hello-world-7sm94',
          number_value: 0.5423,
        },
      ],
      name: 'hello-world-7sm94',
      pipeline_spec: {
        parameters: [
          { name: 'paramName1', value: 'paramVal1' },
          { name: 'paramName2', value: 'paramVal2' },
        ],
        pipeline_id: pipelines[2].id,
        pipeline_name: pipelines[2].name,
      },
      resource_references: [
        {
          key: {
            id: 'a4d4f8c6-ce9c-4200-a92e-c48ec759b733',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('2018-05-17T21:58:23.000Z'),
      status: 'Running',
    },
  },
  {
    pipeline_runtime: {
      workflow_manifest: JSON.stringify(helloWorldWithStepsRun),
    },
    run: {
      created_at: new Date('2018-06-17T22:58:23.000Z'),
      description: 'A simple hello world run, but with steps. Not attached to any experiment',
      finished_at: new Date('2018-06-18T21:00:33.000Z'),
      id: '21afb688-7597-47e9-b6c3-35d3145fe5e1',
      metrics: [
        {
          format: RunMetricFormat.PERCENTAGE,
          name: 'accuracy',
          node_id: 'hello-world-61985dbf-4299-458b-a183-1f2c2436c21c',
          number_value: 0.43,
        },
      ],
      name: 'hello-world-with-steps-kajnkv4',
      pipeline_spec: {
        parameters: [
          { name: 'paramName1', value: 'paramVal1' },
          { name: 'paramName2', value: 'paramVal2' },
        ],
        pipeline_id: pipelines[3].id,
        pipeline_name: pipelines[3].name,
      },
      scheduled_at: new Date('2018-06-17T22:58:23.000Z'),
      status: 'Failed',
    },
  },
  {
    pipeline_runtime: {
      workflow_manifest: JSON.stringify(xgboostRun),
    },
    run: {
      created_at: new Date('2018-07-17T23:58:23.000Z'),
      description: 'An xgboost evaluation run',
      id: 'a8c471b1-a64e-4713-a660-3899815a40e4',
      metrics: [
        {
          format: RunMetricFormat.RAW,
          name: 'numeric_metric',
          node_id: 'xgboost-training-gzkm9-2457131397',
          number_value: 24,
        },
        {
          format: RunMetricFormat.PERCENTAGE,
          name: 'accuracy',
          node_id: 'xgboost-training-gzkm9-1761585008',
          number_value: 0.95675,
        },
        {
          format: RunMetricFormat.PERCENTAGE,
          name: 'accuracy',
          node_id: 'xgboost-training-gzkm9-2365787662',
          number_value: 0.8765,
        },
        {
          format: RunMetricFormat.UNSPECIFIED,
          name: 'unspecified format metric',
          node_id: 'xgboost-training-gzkm9-2203328319',
          number_value: 1.34,
        },
      ],
      name: 'xgboost-evaluation-asdlk2',
      pipeline_spec: {
        parameters: [
          { name: 'paramName1', value: 'paramVal1' },
          { name: 'paramName2', value: 'paramVal2' },
        ],
        pipeline_id: pipelines[1].id,
        pipeline_name: pipelines[1].name,
      },
      resource_references: [
        {
          key: {
            id: '275ea11d-ac63-4ce3-bc33-ec81981ed56a',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('2018-07-17T23:58:23.000Z'),
      status: 'Pending',
    },
  },
  {
    pipeline_runtime: {
      workflow_manifest: JSON.stringify(xgboostRun),
    },
    run: {
      created_at: new Date('2018-08-18T20:58:23.000Z'),
      description:
        'An xgboost evaluation run with a very long description that includes:' +
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum commodo' +
        ' libero, a imperdiet ipsum cursus id. Nullam odio sem, ornare id sollicitudin ac,' +
        ' rutrum in dolor. Integer interdum lacus in ex rutrum elementum. Mauris gravida feugiat' +
        ' enim, ac dapibus augue rhoncus in. Integer vel tempus nulla. Cras sed ultrices dolor.' +
        ' Ut nec dapibus eros, vitae iaculis nunc. In aliquet accumsan rhoncus. Donec vitae' +
        ' ipsum a tellus fermentum pharetra in in neque. Pellentesque consequat felis non est' +
        ' vulputate pellentesque. Aliquam eget cursus enim.',
      finished_at: new Date('2018-08-20T21:01:23.000Z'),
      id: '7fc01714-4a13-4c05-8044-a8a72c14253b',
      metrics: [
        {
          format: RunMetricFormat.PERCENTAGE,
          name: 'accuracy',
          node_id: 'xgboost-training-gzkm9-1253553084',
          number_value: 0.8999,
        },
        {
          format: RunMetricFormat.RAW,
          name: 'log_loss',
          node_id: 'xgboost-training-gzkm9-2365787662',
          number_value: -0.123,
        },
      ],
      name:
        'xgboost-run-with-a-veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery-' +
        'loooooooooooooooooooooooooooong-name-aifk298',
      pipeline_spec: {
        parameters: [
          { name: 'paramName1', value: 'paramVal1' },
          { name: 'paramName2', value: 'paramVal2' },
        ],
        pipeline_id: pipelines[1].id,
        pipeline_name: pipelines[1].name,
      },
      resource_references: [
        {
          key: {
            id: 'a4d4f8c6-ce9c-4200-a92e-c48ec759b733',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('2018-08-18T20:58:23.000Z'),
      status: 'Succeeded',
    },
  },
  {
    pipeline_runtime: {
      workflow_manifest: JSON.stringify(helloWorldRun),
    },
    run: {
      created_at: new Date('2018-08-18T20:58:23.000Z'),
      description: 'simple run with pipeline spec embedded in it.',
      finished_at: new Date('2018-08-18T21:01:23.000Z'),
      id: '7fc01715-4a93-4c00-8044-a8a72c14253b',
      metrics: [
        {
          format: RunMetricFormat.PERCENTAGE,
          name: 'accuracy',
          node_id: 'hello-world-7sm94',
          number_value: 0.5999,
        },
        {
          format: RunMetricFormat.RAW,
          name: 'log_loss',
          node_id: 'hello-world-7sm94',
          number_value: -0.223,
        },
      ],
      name: 'hello-world-with-pipeline',
      pipeline_spec: {
        parameters: [
          { name: 'paramName1', value: 'paramVal1' },
          { name: 'paramName2', value: 'paramVal2' },
        ],
        workflow_manifest: JSON.stringify(helloWorldRun),
      },
      resource_references: [
        {
          key: {
            id: 'a4d4f8c6-ce9c-4200-a92e-c48ec759b733',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('2018-08-18T20:58:23.000Z'),
      status: 'Succeeded',
    },
  },
  {
    pipeline_runtime: {
      workflow_manifest: JSON.stringify(largeGraph),
    },
    run: {
      created_at: new Date('2020-07-08T10:03:37.000Z'),
      description: 'large pipelien with a lot of nodes.',
      finished_at: new Date('2020-07-08T10:39:43.000Z'),
      id: '808ecf03-ee3b-48c6-9fa1-5f14ad11a3f8',
      name: 'Very large graph',
      pipeline_spec: {
        workflow_manifest: JSON.stringify(largeGraph),
      },
      resource_references: [
        {
          key: {
            id: 'a4d4f8c6-ce9c-4200-a92e-c48ec759b733',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('1970-01-01T00:00:00.000Z'),
      status: 'Succeeded',
    },
  },
  {
    pipeline_runtime: {
      workflow_manifest: JSON.stringify(retryRun),
    },
    run: {
      id: '2f9a3d50-454c-4979-be8d-f222bc245bc1',
      created_at: new Date('2020-09-08T08:19:12Z'),
      finished_at: new Date('2020-09-08T08:19:25Z'),
      name: 'Run of retry (835b8)',
      pipeline_spec: {},
      metrics: [],
      resource_references: [
        {
          key: {
            id: '275ea11d-ac63-4ce3-bc33-ec81981ed56a',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      scheduled_at: new Date('1970-01-01T00:00:00Z'),
      status: 'Succeeded',
    },
  },
];

runs.push(...generateNRuns());

function generateNPipelines(): ApiPipeline[] {
  const dummyPipelines: ApiPipeline[] = [];
  for (let i = pipelines.length + 1; i < NUM_DUMMY_PIPELINES + pipelines.length + 1; i++) {
    dummyPipelines.push({
      created_at: new Date('2018-02-12T20:' + padStartTwoZeroes(i.toString()) + ':23.000Z'),
      description: `A dummy pipeline (${i})`,
      id: 'Some-pipeline-id-' + i,
      name: 'Kubeflow Pipeline number ' + i,
      parameters: [
        {
          name: 'project',
          value: 'my-cloud-project',
        },
      ],
    });
  }
  return dummyPipelines;
}

function generateNRuns(): ApiRunDetail[] {
  const dummyRuns: ApiRunDetail[] = [];
  for (let i = runs.length + 1; i < NUM_DUMMY_RUNS + runs.length + 1; i++) {
    dummyRuns.push({
      pipeline_runtime: {
        workflow_manifest: JSON.stringify(coinflipRun),
      },
      run: {
        created_at: new Date('2018-02-12T20:' + padStartTwoZeroes(i.toString()) + ':23.000Z'),
        description: 'The description of a dummy run',
        finished_at: new Date(
          '2018-02-12T20:' + padStartTwoZeroes(((2 * i) % 60).toString()) + ':25.000Z',
        ),
        id: 'Some-run-id-' + i,
        metrics: [
          {
            format: RunMetricFormat.RAW,
            name: 'numeric_metric',
            node_id: 'coinflip-recursive-q7dqb',
            number_value: i,
          },
          {
            format: RunMetricFormat.PERCENTAGE,
            name: 'accuracy',
            node_id: 'coinflip-recursive-q7dqb-1720466287',
            number_value: ((i + 50) % 100) / 100.0,
          },
          {
            format: RunMetricFormat.UNSPECIFIED,
            name: 'unspecified format metric',
            node_id: 'coinflip-recursive-q7dqb-1720466287',
            number_value: i + 0.43,
          },
        ],
        name: 'dummy-coinflip-recursive-asdlx' + i,
        pipeline_spec: {
          parameters: [
            { name: 'paramName1', value: 'paramVal1' },
            { name: 'paramName2', value: 'paramVal2' },
          ],
          pipeline_id: 'Some-pipeline-id-' + i,
          pipeline_name: 'Kubeflow Pipeline number ' + i,
        },
        resource_references: [
          {
            key: {
              id: '275ea11d-ac63-4ce3-bc33-ec81981ed56a',
              type: ApiResourceType.EXPERIMENT,
            },
            relationship: ApiRelationship.OWNER,
          },
        ],
        scheduled_at: new Date('2018-02-12T20:' + padStartTwoZeroes(i.toString()) + ':23.000Z'),
        status: 'Succeeded',
      },
    });
  }
  return dummyRuns;
}

function generateNJobs(): ApiJob[] {
  const dummyJobs: ApiJob[] = [];
  for (let i = jobs.length + 1; i < NUM_DUMMY_JOBS + jobs.length + 1; i++) {
    dummyJobs.push({
      created_at: new Date('2018-02-01T20:' + padStartTwoZeroes(i.toString()) + ':23.000Z'),
      description: 'Some description',
      enabled: false,
      id: 'Some-job-id-' + i,
      max_concurrency: '10',
      name: 'Job#' + i,
      pipeline_spec: {
        parameters: [
          {
            name: 'project',
            value: 'my-cloud-project',
          },
          {
            name: 'workers',
            value: '6',
          },
          {
            name: 'rounds',
            value: '25',
          },
          {
            name: 'output',
            value: 'gs://path-to-my-project',
          },
        ],
        pipeline_id: pipelines[i % pipelines.length].id,
      },
      resource_references: [
        {
          key: {
            id: '7fc01714-4a13-4c05-5902-a8a72c14253b',
            type: ApiResourceType.EXPERIMENT,
          },
          relationship: ApiRelationship.OWNER,
        },
      ],
      status: 'Succeeded',
      trigger: undefined,
      updated_at: new Date('2018-02-01T20:' + padStartTwoZeroes(i.toString()) + ':23.000Z'),
    });
  }
  return dummyJobs;
}

export const data = {
  experiments,
  jobs,
  pipelines,
  versions,
  runs,
};

// tslint:disable:object-literal-sort-keys
export const namedPipelines = {
  v2PythonTwoSteps: PIPELINE_V2_PYTHON_TWO_STEPS,
  unstructuredText: PIPELINE_UNSTRUCTED_TEXT,
  imageClassification: PIPELINE_IMAGE_CLASSIFICATION,
  noParams: PIPELINE_NO_PARAM,
  undefinedParams: PIPELINE_UNDEFINED_PARAM,
};
// tslint:enable:object-literal-sort-keys

export const v2PipelineSpecMap: Map<string, string> = new Map([
  [
    PIPELINE_ID_V2_PYTHON_TWO_STEPS,
    './mock-backend/data/v2/pipeline/mock_lightweight_python_functions_v2_pipeline.json',
  ],
  [
    PIPELINE_ID_V2_PYTHON_TWO_STEPS_REV,
    './mock-backend/data/v2/pipeline/mock_lightweight_python_functions_v2_pipeline_rev.json',
  ],
  [
    PIPELINE_ID_V2_LOOPS_CONDITIONS,
    './mock-backend/data/v2/pipeline/pipeline_with_loops_and_conditions.json',
  ],
  [PIPELINE_ID_V2_XGBOOST, './mock-backend/data/v2/pipeline/xgboost_sample_pipeline.json'],
]);

// Kubeflow versions
export const V2_TWO_STEPS_VERSION_LIST: ApiPipelineVersion[] = [
  PIPELINE_V2_PYTHON_TWO_STEPS_DEFAULT,
  PIPELINE_V2_PYTHON_TWO_STEPS_REV,
];

export const PIPELINE_VERSIONS_LIST_MAP: Map<string, ApiPipelineVersion[]> = new Map([
  [PIPELINE_ID_V2_PYTHON_TWO_STEPS, V2_TWO_STEPS_VERSION_LIST],
]);

export const PIPELINE_VERSIONS_LIST_FULL: ApiPipelineVersion[] = [
  ...pipelines,
  PIPELINE_V2_PYTHON_TWO_STEPS_REV,
];
