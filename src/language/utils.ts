/*
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

module Lint {
    var path = require("path");

    export function getSourceFile(fileName: string, source: string): ts.SourceFile {
        var normalizedName = path.normalize(fileName);
        var compilerOptions = createCompilerOptions();

        return ts.createSourceFile(normalizedName, source, compilerOptions.target, "0");
    }

    export function createCompilerOptions(): ts.CompilerOptions {
        return {
            target: ts.ScriptTarget.ES5
        };
    }

    export function doesIntersect(failure: RuleFailure, disabledIntervals: Lint.IDisabledInterval[]) {
        var intersectionExists = false;

        disabledIntervals.forEach((disabledInterval) => {
            var maxStart = Math.max(disabledInterval.startPosition, failure.getStartPosition().getPosition());
            var minEnd = Math.min(disabledInterval.endPosition, failure.getEndPosition().getPosition());
            if (maxStart <= minEnd) {
                // intervals intersect
                intersectionExists = true;
            }
        });
        return intersectionExists;
    }

    export function abstract() {
        return "abstract method not implemented";
    }
}
