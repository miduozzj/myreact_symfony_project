<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Driver\Connection;
use Symfony\Component\HttpFoundation\File\File;

class AnalysisController extends AbstractController
{
    /**
     * @Route("/app/Analysis/getList", name="getlist")
     */
    public function getListAction(Connection $connection){
        //$parm = $request->request->get('parm');
        //$parm = json_decode($parm, true);
        $request_body = file_get_contents('php://input');
        $parm = json_decode($request_body, true);
        $user = $this->getUser();
        $pagesize = $parm["rows"];
        $offset = ($parm["page"] - 1) * $pagesize;
       // $em = $this->get('database_connection');
        $sql='select * from mytable ';
        if(isset($parm['tiaojian'])){
            $sql.=" where name like '%".$parm['tiaojian']."%'";
        }
        $limit=" LIMIT $offset,$pagesize";
        $total = $connection->fetchAll(str_ireplace('*','count(*) as total',$sql));
        $sql .= $limit;
        $data = $connection->fetchAll($sql);
        return $this->json(array("total"=>$total[0]['total'],"rows"=>$data));
    }
    /**
     * @Route("/app/Analysis/addList", name="addlist")
     */
    public function addListAction(Connection $connection){
        //$parm = $request->request->get('parm');
        //$parm = json_decode($parm, true);
        $request_body = file_get_contents('php://input');
        $parm = json_decode($request_body, true);
        // $em = $this->get('database_connection');
        $id=$parm['id'];
        $value=$parm['value'];
        if($id!=''){
            if($list = $this->getDoctrine()->getManager()->getRepository("App:Mytable")->find($id)) {
                $list->setName($value['name'])
                    ->setDes($value['des'])
                    ->setUrl($value['url']);
                $this->getDoctrine()->getManager()->flush();
                return $this->Json(array("msg" => "success"));
            }else{
                return $this->Json(array("msg" => "fail"));
            }
        }else{
            $list = $this->getDoctrine()->getManager()->getRepository("App:Mytable");
            $list->add($value);
            return $this->Json(array("msg"=>"success"));
            }
        }
    /**
     * @Route("/app/Analysis/delList", name="dellist")
     */
    public function delListAction(Request $request)
    {
        $request_body = file_get_contents('php://input');
        $parm = json_decode($request_body, true);
        $id = $parm['id'];
        if ($id) {
            foreach ($id as $item) {
                if ($list = $this->getDoctrine()->getManager()->getRepository("App:Mytable")->find($item)) {
                    $this->getDoctrine()->getManager()->remove($list);
                    $this->getDoctrine()->getManager()->flush();
                } else {
                    return $this->Json(array("msg" => "fail"));
                }
            }
            return $this->Json(array("msg" => "success"));
        }else{
            return $this->Json(array("msg" => "fail"));
        }
    }
     /**
     * @Route("/app/Monitor/download", name="download")
     */
    public function downloadAction()
    {
        $file= new File('./Desert.jpg');
        return $this->file($file,'my.jpg');
    }
}