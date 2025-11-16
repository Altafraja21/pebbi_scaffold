{{- define "pebbi.labels" -}}
app.kubernetes.io/name: {{ include "pebbi.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}


{{- define "pebbi.name" -}}
pebbi
{{- end -}}