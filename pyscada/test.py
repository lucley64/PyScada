
@python_2_unicode_compatible
class Bar(WidgetContentModel):
    id = models.AutoField(primary_key=True)

    title = models.CharField(max_length=400, default='')
    x_axis_label = models.CharField(max_length=400, default='', blank=True)
    y_axis_label = models.CharField(max_length=400, default='', blank=True)

    variables = models.ManyToManyField(Variable, blank=True)

    library = models.ForeignKey(ChartLibrarie, default=None, related_name='library', null=True, blank=True,
                                   on_delete=models.SET_NULL)

    def __str__(self):
        return text_type(str(self.id) + ': ' + self.title)

    def visible(self):
        return True

    def variables_list(self, exclude_list=[]):
        list = []
        for axe in self.chart_set.all():
            for item in axe.variables.exclude(pk__in=exclude_list):
                list.append(item)
        return list

    def values(self):
        allValues = []
        for xVariable in self.variables:
            for xValue in xVariable:
                allValues.append(xValue)
        return allValues

    def xMin(self):
        return min(self.values(self))

    def xMax(self):
        return max(self.values(self))

    def gen_html(self, **kwargs):
        """

        :return: main panel html and sidebar html as
        """
        widget_pk = kwargs['widget_pk'] if 'widget_pk' in kwargs else 0
        main_template = get_template('bar.html')
        sidebar_template = get_template('chart_legend.html')
        main_content = main_template.render(dict(bar=self, widget_pk=widget_pk))
        sidebar_content = sidebar_template.render(dict(chart=self, widget_pk=widget_pk))
        return main_content, sidebar_content


#
# Libraries
#
class ChartLibrarie(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=400, default='')
    link = models.CharField(max_length=400, default='')

    def __str__(self) :
        return self.title

