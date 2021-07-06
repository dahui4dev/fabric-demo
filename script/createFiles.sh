#!/bin/sh

path=$1
files=$(ls $path)

for filename in $files

do
   touch ./$filename/$filename.tsx
done
