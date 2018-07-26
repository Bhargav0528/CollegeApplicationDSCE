package com.dsce.self_learning.sampleapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

public class SecondActivity extends AppCompatActivity {

    EditText et1, et2;
    Button calc;
    TextView res;

    RadioButton add,sub,mul,div;
    RadioGroup arithmaticGroup;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        et1 = findViewById(R.id.firstno);
        et2 = findViewById(R.id.secondno);
        calc = findViewById(R.id.calc);
        res = findViewById(R.id.res);

        arithmaticGroup = findViewById(R.id.grp_arith);

        add = findViewById(R.id.rd_add);
        sub = findViewById(R.id.rd_sub);
        mul = findViewById(R.id.rd_mul);
        div = findViewById(R.id.rd_div);



        calc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calculate();
            }
        });

    }


    void calculate(){
        int first_no = Integer.parseInt(et1.getText().toString());
        int second_no = Integer.parseInt(et2.getText().toString());

        int selectedId = arithmaticGroup.getCheckedRadioButtonId();
        //RadioButton rd = findViewById(selectedId);
        //Log.i("SecondActivity", String.valueOf(rd.getId()));

        RadioButton rd=(RadioButton)findViewById(selectedId);
        Toast.makeText(SecondActivity.this,rd.getText(),Toast.LENGTH_SHORT).show();

        int result = 0;

        if(rd.getText().equals("Addition"))
        {
            result = first_no+second_no;
        }
        else if(rd.getText().equals("Subtraction"))
        {
            result = first_no-second_no;
        }
        else if(rd.getText().equals("Multiplication"))
        {
            result = first_no*second_no;
        }
        else if(rd.getText().equals("Division"))
        {
            result = first_no/second_no;
        }
        else {
            Toast.makeText(SecondActivity.this,"Please enter valid operation",Toast.LENGTH_SHORT).show();
        }




        res.setText("Your result is :"+ result);

    }
}
